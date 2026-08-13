import { useState, type FormEvent } from 'react'
import { Mail, Send } from 'lucide-react'
import { FadeIn } from '@/components/ui/Motion'
import { Button } from '@/components/ui/Button'
import { Input, Label, Textarea } from '@/components/ui/Input'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { siteConfig } from '@/config/site'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ContactPage() {
  usePageMeta('Contact', `Contact ${siteConfig.name} via email, GitHub, or LinkedIn.`)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-56 grid-bg glow-spot opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s talk systems
          </h1>
          <p className="mt-4 max-w-2xl text-text-muted">
            No fake backend inbox — the form opens your email client. Prefer a direct channel?
            Use the links below.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <FadeIn>
            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent"
              >
                <Mail className="text-accent" size={20} />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="font-mono text-sm text-text-muted">{siteConfig.email}</p>
                </div>
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent"
              >
                <GithubIcon className="text-accent" size={20} />
                <div>
                  <p className="text-sm font-medium">GitHub</p>
                  <p className="font-mono text-sm text-text-muted">{siteConfig.github}</p>
                </div>
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent"
              >
                <LinkedinIcon className="text-accent" size={20} />
                <div>
                  <p className="text-sm font-medium">LinkedIn</p>
                  <p className="font-mono text-sm text-text-muted">{siteConfig.linkedin}</p>
                </div>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <form
              onSubmit={onSubmit}
              className="rounded-lg border border-border bg-surface p-6 sm:p-8"
            >
              <p className="font-mono text-xs text-text-muted">
                Submits via mailto — opens your email client. Nothing is stored on a server.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Your email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                />
              </div>
              <Button type="submit" className="mt-6" size="lg">
                <Send size={16} /> Open email client
              </Button>
            </form>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
