import { useState, type FormEvent } from 'react'
import { Mail, Send } from 'lucide-react'
import { FadeIn } from '@/components/ui/Motion'
import { Button } from '@/components/ui/Button'
import { Input, Label, Textarea } from '@/components/ui/Input'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { siteConfig } from '@/config/site'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ContactPage() {
  usePageMeta(
    'Contact',
    `Contact Abhigyan Varma (Mozart Dev) via email, GitHub, or LinkedIn for software development opportunities.`,
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'visitor'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="page-wash">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <FadeIn>
          <p className="text-sm font-semibold text-accent">Contact</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s talk
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
            Prefer email, GitHub, or LinkedIn? Use the links. The form opens your email client —
            nothing is stored on a server.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="space-y-3">
              {[
                {
                  href: `mailto:${siteConfig.email}`,
                  icon: <Mail className="text-accent" size={20} />,
                  label: 'Email',
                  value: siteConfig.email,
                },
                {
                  href: siteConfig.github,
                  icon: <GithubIcon className="text-accent" size={20} />,
                  label: 'GitHub',
                  value: siteConfig.github.replace('https://', ''),
                  external: true,
                },
                {
                  href: siteConfig.linkedin,
                  icon: <LinkedinIcon className="text-accent" size={20} />,
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/abhigyan-varma',
                  external: true,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  className="soft-panel flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-border-strong"
                >
                  {item.icon}
                  <div>
                    <p className="text-sm font-semibold text-text">{item.label}</p>
                    <p className="text-sm text-text-muted">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <form onSubmit={onSubmit} className="soft-panel rounded-2xl p-6 sm:p-8">
              <p className="text-sm text-text-muted">
                Submits with mailto — your email app will open with this message filled in.
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
