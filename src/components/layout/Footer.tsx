import type { MouseEvent } from 'react'
import { Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'

export function Footer() {
  const navigate = useNavigate()

  const openControlRoom = (e: MouseEvent) => {
    if (e.detail === 3) {
      e.preventDefault()
      navigate('/control-room')
    }
  }

  return (
    <footer className="mt-auto border-t border-border bg-bg-elevated">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm text-accent">{siteConfig.name}</p>
          <p className="mt-1 max-w-md text-sm text-text-muted">
            I don&apos;t just learn technologies. I build systems with them.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border p-2 text-text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border p-2 text-text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-md border border-border p-2 text-text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <button
            type="button"
            onClick={openControlRoom}
            className="font-mono text-xs text-text-muted/60 transition-colors hover:text-text-muted"
            title="Triple-click"
          >
            built with intent
          </button>
          <Link to="/" className="font-mono text-xs text-text-muted hover:text-accent">
            {siteConfig.shortName}
          </Link>
        </div>
      </div>
    </footer>
  )
}
