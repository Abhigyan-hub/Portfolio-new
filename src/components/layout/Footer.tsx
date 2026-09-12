import type { MouseEvent } from 'react'
import { Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="text-base font-semibold text-text">{siteConfig.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Building software, vision systems, and hardware projects that connect to the real world.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border bg-surface p-2.5 text-text-muted transition-colors hover:border-border-strong hover:text-text"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border bg-surface p-2.5 text-text-muted transition-colors hover:border-border-strong hover:text-text"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-full border border-border bg-surface p-2.5 text-text-muted transition-colors hover:border-border-strong hover:text-text"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <button
            type="button"
            onClick={openControlRoom}
            className="text-sm text-text-muted/70 transition-colors hover:text-text-muted"
            title="Triple-click"
          >
            Portfolio
          </button>
        </div>
      </div>
    </footer>
  )
}
