import { useEffect } from 'react'
import { siteConfig } from '@/config/site'

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title.includes(siteConfig.name)
      ? title
      : `${title} · ${siteConfig.name}`
    document.title = fullTitle

    const desc =
      description ??
      'Engineering portfolio spanning full-stack software, computer vision, robotics, IoT, and research.'

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', desc)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', fullTitle)
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', desc)
  }, [title, description])
}
