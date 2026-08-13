import { FadeIn } from '@/components/ui/Motion'
import { usePageMeta } from '@/hooks/usePageMeta'
import { siteConfig } from '@/config/site'

const domains = [
  {
    title: 'Software',
    body: 'React, React Native, TypeScript, Python, FastAPI, databases, and cloud-connected products.',
  },
  {
    title: 'Systems',
    body: 'AWS, APIs, authentication, deployment, infrastructure, and scalable architecture.',
  },
  {
    title: 'Computer Vision',
    body: 'OpenCV, OCR, QR/barcode recognition, and image-processing pipelines that feed real apps.',
  },
  {
    title: 'Hardware',
    body: 'Arduino, Raspberry Pi, ESP8266, drones, sensors, and embedded systems that touch the physical world.',
  },
  {
    title: 'Research',
    body: 'Algorithm analysis, experimentation, pathfinding studies, and statistical evaluation.',
  },
]

export function AboutPage() {
  usePageMeta('About', `About ${siteConfig.name} — software, systems, vision, hardware, and research.`)

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-64 grid-bg glow-spot opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">About</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            A developer profile built around systems — not a resume dump.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
            I&apos;m a Computer Science engineering student and developer working across full-stack
            web, mobile, computer vision, cloud infrastructure, robotics, IoT, and research. The
            through-line is the same: design and ship systems that connect software to real
            constraints.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {domains.map((d, i) => (
            <FadeIn key={d.title} delay={i * 0.05}>
              <article className="h-full rounded-lg border border-border bg-surface p-6">
                <p className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-2 text-xl font-semibold">{d.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{d.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-14 rounded-lg border border-border bg-bg-elevated p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">How I work</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
            I care about the seams between layers: mobile clients talking to FastAPI services,
            OCR outputs becoming structured app data, flight controllers meeting calibration
            discipline, and research claims backed by repeated trials. The portfolio is meant to
            show that range clearly — serious engineering, not a generic template greeting.
          </p>
        </FadeIn>
      </div>
    </div>
  )
}
