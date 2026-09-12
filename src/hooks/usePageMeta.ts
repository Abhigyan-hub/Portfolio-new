import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_DESCRIPTION,
  OG_TITLE,
  absoluteUrl,
  ogImageUrl,
  pageTitle,
  SITE_NAME,
} from '@/config/seo'

type MetaOptions = {
  /** Override path for canonical (defaults to current location). */
  path?: string
  /** Prevent indexing (404, control room). */
  noIndex?: boolean
  /** Use title as-is without brand suffix. */
  absoluteTitle?: boolean
  /** Open Graph type */
  type?: 'website' | 'article'
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Client-side meta updates for the Vite SPA.
 * Canonical URLs always use https://www.mozartdev.in (never bare domain / current origin).
 */
export function usePageMeta(
  title: string,
  description?: string,
  options: MetaOptions = {},
) {
  const location = useLocation()

  useEffect(() => {
    const path = options.path ?? location.pathname
    const canonical = absoluteUrl(path)
    const isHome = path === '/' || path === ''

    const fullTitle = options.absoluteTitle
      ? title
      : isHome
        ? DEFAULT_TITLE
        : pageTitle(title)

    const desc = description ?? DEFAULT_DESCRIPTION
    const image = ogImageUrl()
    const ogTitle = isHome ? OG_TITLE : fullTitle
    const ogDesc = isHome ? OG_DESCRIPTION : desc

    document.title = fullTitle

    upsertMeta('name', 'description', desc)
    upsertMeta(
      'name',
      'robots',
      options.noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large',
    )

    upsertMeta('property', 'og:title', ogTitle)
    upsertMeta('property', 'og:description', ogDesc)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:secure_url', image)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:type', options.type ?? 'website')
    upsertMeta('property', 'og:locale', 'en_US')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', ogTitle)
    upsertMeta('name', 'twitter:description', ogDesc)
    upsertMeta('name', 'twitter:image', image)

    upsertLink('canonical', canonical)
  }, [title, description, options.path, options.noIndex, options.absoluteTitle, options.type, location.pathname])
}
