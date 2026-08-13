import { defaultPortfolioData } from '@/data'
import { STORAGE_KEY } from '@/config/site'
import type { PortfolioData } from '@/types'

function isPortfolioData(value: unknown): value is PortfolioData {
  if (!value || typeof value !== 'object') return false
  const data = value as PortfolioData
  return (
    Array.isArray(data.projects) &&
    Array.isArray(data.skills) &&
    Array.isArray(data.experience) &&
    Array.isArray(data.research)
  )
}

export function loadPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultPortfolioData)
    const parsed: unknown = JSON.parse(raw)
    if (!isPortfolioData(parsed)) return structuredClone(defaultPortfolioData)
    return {
      ...structuredClone(defaultPortfolioData),
      ...parsed,
      version: parsed.version || defaultPortfolioData.version,
    }
  } catch {
    return structuredClone(defaultPortfolioData)
  }
}

export function savePortfolioData(data: PortfolioData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetPortfolioData(): PortfolioData {
  localStorage.removeItem(STORAGE_KEY)
  return structuredClone(defaultPortfolioData)
}

export function exportPortfolioData(data: PortfolioData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importPortfolioData(file: File): Promise<PortfolioData> {
  const text = await file.text()
  const parsed: unknown = JSON.parse(text)
  if (!isPortfolioData(parsed)) {
    throw new Error('Invalid portfolio JSON structure')
  }
  savePortfolioData(parsed)
  return parsed
}
