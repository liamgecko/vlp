"use client";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Pagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      if (currentPage > 4) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      
      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className="flex items-center justify-between">
      {/* Previous Button */}
      <div className="-mt-px flex w-0 flex-1">
        {hasPrevious ? (
          <a
            href={`${basePath}?page=${currentPage - 1}#articles`}
            className="inline-flex items-center border-transparent pt-4 pr-1 text-sm font-medium text-primary"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="mr-3 size-5 text-primary">
              <path d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
            Previous
          </a>
        ) : (
          <span className="inline-flex items-center border-transparent pt-4 pr-1 text-sm font-medium text-primary">
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="mr-3 size-5 text-gray-300 dark:text-gray-600">
              <path d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
            Previous
          </span>
        )}
      </div>

      {/* Page Numbers */}
      <div className="hidden md:-mt-px md:flex space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                ...
              </span>
            );
          }

          const isCurrentPage = page === currentPage;
          const pageNumber = page as number;

          return (
            <a
              key={pageNumber}
              href={`${basePath}?page=${pageNumber}#articles`}
              aria-current={isCurrentPage ? 'page' : undefined}
              className={`inline-flex items-center rounded-full size-8 justify-center text-sm font-medium hover:bg-sunflower-200 hover:text-white transition-colors duration-200 ${
                isCurrentPage
                  ? 'text-primary bg-blush-300'
                  : 'text-primary hover:bg-sunflower-200 hover:text-white'
              }`}
            >
              {pageNumber}
            </a>
          );
        })}
      </div>

      {/* Next Button */}
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {hasNext ? (
          <a
            href={`${basePath}?page=${currentPage + 1}#articles`}
            className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-primary hover:border-primary hover:text-primary"
          >
            Next
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="ml-3 size-5 text-primary">
              <path d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </a>
        ) : (
          <span className="inline-flex items-center border-transparent pt-4 pl-1 text-sm font-medium text-muted-foreground">
            Next
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="ml-3 size-5 text-muted-foreground">
              <path d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
