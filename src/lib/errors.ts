// Custom error types for better error handling
export class WPError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'WPError';
  }
}

export class ValidationError extends WPError {
  constructor(message: string, field?: string) {
    super(message, 'VALIDATION_ERROR', 400, { field });
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends WPError {
  constructor(resource: string, identifier?: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404, { resource, identifier });
    this.name = 'NotFoundError';
  }
}

export class NetworkError extends WPError {
  constructor(message: string, originalError?: Error) {
    super(message, 'NETWORK_ERROR', 503, { originalError: originalError?.message });
    this.name = 'NetworkError';
  }
}

// Error logging utility
export const logError = (error: Error, context?: Record<string, unknown>) => {
  const errorInfo = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context,
  };

  // In production, you'd send this to a logging service
  if (process.env.NODE_ENV === 'production') {
    console.error('Production Error:', errorInfo);
    // TODO: Send to logging service (Sentry, LogRocket, etc.)
  } else {
    console.error('Development Error:', errorInfo);
  }
};

// Error boundary helper
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof WPError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
};

// Safe async wrapper
export const safeAsync = async <T>(
  fn: () => Promise<T>,
  fallback?: T,
  context?: Record<string, unknown>
): Promise<T | undefined> => {
  try {
    return await fn();
  } catch (error) {
    logError(error as Error, context);
    return fallback;
  }
};

// Retry utility for network requests
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw new NetworkError(
          `Failed after ${maxRetries} attempts: ${lastError.message}`,
          lastError
        );
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError!;
};
