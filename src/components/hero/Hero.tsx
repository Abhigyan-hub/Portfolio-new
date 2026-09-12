import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 page-wash" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-base font-semibold text-accent">Mozart Dev</p>
          <p className="mt-2 text-base text-text-muted">{siteConfig.role}</p>

          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Abhigyan Varma — Software Developer
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
            {siteConfig.tagline} I build across full-stack products, computer vision, cloud,
            robotics, and research — with a focus on systems that work in the real world.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/projects">
              <Button size="lg">
                View projects <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Contact me
              </Button>
            </Link>
            <div className="ml-1 flex items-center gap-1">
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
          </div>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          {[
            { label: 'Building', value: siteConfig.currentlyBuilding },
            { label: 'Learning', value: siteConfig.currentlyLearning },
            { label: 'Focus', value: siteConfig.currentFocus },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-sm font-medium text-accent">{item.label}</p>
              <p className="mt-2 text-base leading-relaxed text-text-muted">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
