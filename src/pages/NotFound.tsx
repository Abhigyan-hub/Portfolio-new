import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { usePageMeta } from '@/hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta('404', 'Page not found on Mozart Dev.', { noIndex: true })

  return (
    <div className="page-wash flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg text-center">
        <p className="text-6xl font-bold tracking-tight text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-lg leading-relaxed text-text-muted">
          That link doesn&apos;t match anything on this site. Head home or browse projects instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button>Go home</Button>
          </Link>
          <Link to="/projects">
            <Button variant="secondary">View projects</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
