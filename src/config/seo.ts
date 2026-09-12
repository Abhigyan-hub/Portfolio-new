/** Production SEO constants — always use www canonical. */
export const SITE_ORIGIN = 'https://www.mozartdev.in' as const
export const SITE_NAME = 'Mozart Dev' as const
export const PERSON_NAME = 'Abhigyan Varma' as const

export const DEFAULT_TITLE =
  'Abhigyan Varma | Software Developer & Backend Engineer | Mozart Dev' as const

export const DEFAULT_DESCRIPTION =
  'Abhigyan Varma is a software developer and Computer Science engineering student focused on backend engineering, full-stack development and scalable applications. Explore his projects, technical work and software development portfolio at Mozart Dev.' as const

export const OG_TITLE = 'Abhigyan Varma | Software Developer — Mozart Dev' as const

export const OG_DESCRIPTION =
  'Software developer building backend systems, full-stack applications and technology projects.' as const

export const OG_IMAGE_PATH = '/og-image.png' as const

/** Absolute www URL. Homepage keeps trailing slash; other paths do not. */
export function absoluteUrl(pathname = '/'): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (path === '/') return `${SITE_ORIGIN}/`
  return `${SITE_ORIGIN}${path.replace(/\/+$/, '')}`
}

export function ogImageUrl(version = '4'): string {
  return `${SITE_ORIGIN}${OG_IMAGE_PATH}?v=${version}`
}

export function pageTitle(segment: string, includeBrand = true): string {
  if (segment.includes(PERSON_NAME) && segment.includes(SITE_NAME)) return segment
  if (segment.includes(PERSON_NAME)) {
    return includeBrand ? `${segment} | ${SITE_NAME}` : segment
  }
  return includeBrand
    ? `${segment} | ${PERSON_NAME} — ${SITE_NAME}`
    : `${segment} | ${PERSON_NAME}`
}
