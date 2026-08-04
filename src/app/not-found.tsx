import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-lg text-muted">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
      >
        Go home
      </Link>
    </div>
  )
}
