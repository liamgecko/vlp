import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF4EB] to-sunflower-100">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-heading font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-[#554d77] mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-blush-300 text-primary px-6 py-3 text-sm font-semibold rounded-full hover:bg-blush-300/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:ring-offset-2"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
