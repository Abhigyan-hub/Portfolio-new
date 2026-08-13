import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg glow-spot" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pb-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-sm text-accent">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-text-muted">{siteConfig.role}</p>

          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-text-muted">
            Full-stack development, computer vision, cloud systems, robotics, IoT, and research —
            built as connected systems, not isolated demos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects">
              <Button size="lg">
                View Projects <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Contact Me
              </Button>
            </Link>
            <a href={siteConfig.github} target="_blank" rel="noreferrer">
              <Button size="lg" variant="ghost" aria-label="GitHub">
                <GithubIcon size={18} />
              </Button>
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">
              <Button size="lg" variant="ghost" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </Button>
            </a>
            <a href={`mailto:${siteConfig.email}`}>
              <Button size="lg" variant="ghost" aria-label="Email">
                <Mail size={18} />
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-4 sm:grid-cols-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {[
            { label: 'Currently building', value: siteConfig.currentlyBuilding },
            { label: 'Currently learning', value: siteConfig.currentlyLearning },
            { label: 'Current focus', value: siteConfig.currentFocus },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-surface/70 p-4 backdrop-blur-sm"
            >
              <Badge>{item.label}</Badge>
              <p className="mt-3 text-sm leading-relaxed text-text">{item.value}</p>
            </div>
          ))}
        </motion.div>

        <div
          className="mt-10 overflow-hidden rounded-lg border border-border bg-bg-elevated/80 font-mono text-xs text-text-muted"
          aria-hidden
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            <span className="ml-2">session — systems.build</span>
          </div>
          <pre className="overflow-x-auto p-4 leading-relaxed">
{`$ domains --active
  full-stack · computer-vision · cloud · robotics · iot · research

$ mantra
  "I don't just learn technologies. I build systems with them."`}
          </pre>
        </div>
      </div>
    </section>
  )
}
