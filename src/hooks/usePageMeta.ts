import { useEffect } from 'react'
import { siteConfig } from '@/config/site'

const SITE_URL = 'https://www.mozartdev.in'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png?v=3`

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
) {
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

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title.includes(siteConfig.name)
      ? title
      : `${title} · ${siteConfig.name}`

    const desc =
      description ??
      'Computer Science engineer building full-stack products, computer vision, robotics, and research.'

    const path = `${window.location.origin}${window.location.pathname}`
    const canonical = path.startsWith('http') ? path : `${SITE_URL}${window.location.pathname}`

    document.title = fullTitle

    upsertMeta('name', 'description', desc)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', DEFAULT_IMAGE)
    upsertMeta('property', 'og:image:secure_url', DEFAULT_IMAGE)
    upsertMeta('property', 'og:site_name', 'Mozart Dev')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)
    upsertMeta('name', 'twitter:image', DEFAULT_IMAGE)
    upsertLink('canonical', canonical)
  }, [title, description])
}
