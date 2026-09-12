import { FadeIn } from '@/components/ui/Motion'
import { usePageMeta } from '@/hooks/usePageMeta'
import { brandName, siteConfig } from '@/config/site'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'

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
  usePageMeta(
    'About',
    `Abhigyan Varma is a Computer Science engineering student and software developer focused on backend engineering, full-stack development and scalable applications. Mozart Dev is his software development portfolio.`,
  )

  return (
    <div className="page-wash">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <FadeIn>
          <p className="text-sm font-semibold text-accent">About</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Abhigyan Varma — Software Developer
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
            Abhigyan Varma is a Computer Science engineering student and software developer focused
            on backend engineering, full-stack development and scalable applications.{' '}
            {brandName} is his software development brand and portfolio — a place to explore
            projects spanning React, FastAPI, Python, cloud systems, computer vision, and hardware.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
            He works across full-stack web, mobile, computer vision, cloud infrastructure, robotics,
            IoT, and research. The through-line is the same: design and ship systems that hold up
            under real constraints.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text"
            >
              <GithubIcon size={16} /> GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {domains.map((d, i) => (
            <FadeIn key={d.title} delay={i * 0.04}>
              <article className="soft-panel h-full rounded-2xl p-6 sm:p-7">
                <p className="text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">{d.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{d.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="soft-panel mt-10 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">How I work</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-text-muted">
            I care about the seams between layers: mobile clients talking to FastAPI services,
            OCR outputs becoming structured app data, flight controllers meeting calibration
            discipline, and research claims backed by repeated trials. This site is meant to show
            that range clearly — without the template noise.
          </p>
        </FadeIn>
      </div>
    </div>
  )
}
