import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/hero/Hero'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { FadeIn } from '@/components/ui/Motion'
import { Button } from '@/components/ui/Button'
import { usePortfolio } from '@/hooks/usePortfolio'
import { usePageMeta } from '@/hooks/usePageMeta'

export function HomePage() {
  usePageMeta('Home', 'Systems builder spanning software, computer vision, robotics, and research.')
  const { data } = usePortfolio()
  const featured = [...data.projects]
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 4)

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <FadeIn>
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-accent">Selected work</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Projects worth opening
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-text-muted">
                A mix of full-stack products, vision pipelines, research, and hardware — written to
                be easy to scan.
              </p>
            </div>
            <Link to="/projects" className="hidden sm:block">
              <Button variant="secondary">
                All projects <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.05}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link to="/projects">
            <Button variant="secondary" className="w-full">
              All projects <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 md:py-20">
          {[
            {
              title: 'Software & systems',
              body: 'React, React Native, FastAPI, databases, auth, and cloud deployment for real products.',
            },
            {
              title: 'Vision & hardware',
              body: 'OpenCV, OCR, QR/barcode pipelines, drones, sensors, and embedded stacks.',
            },
            {
              title: 'Research mindset',
              body: 'Controlled experiments, algorithm analysis, and evidence over anecdotes.',
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <p className="text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{item.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
