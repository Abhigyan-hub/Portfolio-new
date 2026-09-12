import { useEffect } from 'react'
import { siteConfig, brandName } from '@/config/site'
import { SITE_ORIGIN, absoluteUrl } from '@/config/seo'

/**
 * Injects Person + WebSite JSON-LD once. Safe for SPA (replaces prior block on remount).
 */
export function JsonLd() {
  useEffect(() => {
    const id = 'mozart-dev-jsonld'
    const existing = document.getElementById(id)
    if (existing) existing.remove()

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_ORIGIN}/#website`,
          name: brandName,
          url: absoluteUrl('/'),
          description:
            'Mozart Dev is the software development portfolio of Abhigyan Varma — software developer and Computer Science engineering student.',
          publisher: { '@id': `${SITE_ORIGIN}/#person` },
          inLanguage: 'en',
        },
        {
          '@type': 'Person',
          '@id': `${SITE_ORIGIN}/#person`,
          name: siteConfig.name,
          url: absoluteUrl('/'),
          jobTitle: 'Software Developer',
          description:
            'Software developer and Computer Science engineering student focused on backend and full-stack development.',
          email: siteConfig.email,
          sameAs: [siteConfig.github, siteConfig.linkedin].filter(Boolean),
          knowsAbout: [
            'Software Development',
            'Backend Engineering',
            'Full-Stack Development',
            'Computer Science',
            'APIs',
            'React',
            'Python',
            'FastAPI',
          ],
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Computer Science Engineering',
          },
        },
        {
          '@type': 'ProfilePage',
          '@id': `${SITE_ORIGIN}/#profilepage`,
          url: absoluteUrl('/'),
          name: `${siteConfig.name} — ${brandName}`,
          mainEntity: { '@id': `${SITE_ORIGIN}/#person` },
          isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        },
      ],
    }

    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.text = JSON.stringify(graph)
    document.head.appendChild(script)

    return () => {
      document.getElementById(id)?.remove()
    }
  }, [])

  return null
}
