import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { usePageMeta } from '@/hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta('404', 'Route not found.')
  const [line, setLine] = useState(0)
  const lines = [
    '$ route --resolve',
    'error: path not in router table',
    'hint: return to a known surface',
  ]

  useEffect(() => {
    const id = window.setInterval(() => {
      setLine((l) => (l < lines.length - 1 ? l + 1 : l))
    }, 400)
    return () => window.clearInterval(id)
  }, [lines.length])

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="absolute inset-0 grid-bg glow-spot opacity-40" aria-hidden />
      <div className="relative w-full max-w-lg text-center">
        <p className="font-mono text-7xl font-semibold text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Route not found.</h1>
        <div className="mx-auto mt-8 overflow-hidden rounded-lg border border-border bg-bg-elevated p-4 text-left font-mono text-xs text-text-muted">
          {lines.slice(0, line + 1).map((l) => (
            <p key={l} className="leading-relaxed">
              {l}
              {l === lines[line] && <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-accent" />}
            </p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
          <Link to="/projects">
            <Button variant="secondary">View Projects</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
