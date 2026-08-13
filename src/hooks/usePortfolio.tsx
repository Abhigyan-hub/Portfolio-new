import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  exportPortfolioData,
  importPortfolioData,
  loadPortfolioData,
  resetPortfolioData,
  savePortfolioData,
} from '@/lib/storage'
import type {
  Experience,
  PortfolioData,
  Project,
  ResearchEntry,
  Skill,
} from '@/types'

interface PortfolioContextValue {
  data: PortfolioData
  isHydrated: boolean
  hasLocalChanges: boolean
  setData: (data: PortfolioData) => void
  updateProjects: (projects: Project[]) => void
  updateSkills: (skills: Skill[]) => void
  updateExperience: (experience: Experience[]) => void
  updateResearch: (research: ResearchEntry[]) => void
  resetToDefault: () => void
  exportJson: () => void
  importJson: (file: File) => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<PortfolioData>(() => loadPortfolioData())
  const [isHydrated, setIsHydrated] = useState(false)
  const [hasLocalChanges, setHasLocalChanges] = useState(false)

  useEffect(() => {
    const loaded = loadPortfolioData()
    setDataState(loaded)
    setHasLocalChanges(Boolean(localStorage.getItem('portfolio-content-v1')))
    setIsHydrated(true)
  }, [])

  const setData = useCallback((next: PortfolioData) => {
    setDataState(next)
    savePortfolioData(next)
    setHasLocalChanges(true)
  }, [])

  const updateProjects = useCallback(
    (projects: Project[]) => setData({ ...data, projects }),
    [data, setData],
  )
  const updateSkills = useCallback(
    (skills: Skill[]) => setData({ ...data, skills }),
    [data, setData],
  )
  const updateExperience = useCallback(
    (experience: Experience[]) => setData({ ...data, experience }),
    [data, setData],
  )
  const updateResearch = useCallback(
    (research: ResearchEntry[]) => setData({ ...data, research }),
    [data, setData],
  )

  const resetToDefault = useCallback(() => {
    const fresh = resetPortfolioData()
    setDataState(fresh)
    setHasLocalChanges(false)
  }, [])

  const exportJson = useCallback(() => exportPortfolioData(data), [data])

  const importJson = useCallback(async (file: File) => {
    const imported = await importPortfolioData(file)
    setDataState(imported)
    setHasLocalChanges(true)
  }, [])

  const value = useMemo(
    () => ({
      data,
      isHydrated,
      hasLocalChanges,
      setData,
      updateProjects,
      updateSkills,
      updateExperience,
      updateResearch,
      resetToDefault,
      exportJson,
      importJson,
    }),
    [
      data,
      isHydrated,
      hasLocalChanges,
      setData,
      updateProjects,
      updateSkills,
      updateExperience,
      updateResearch,
      resetToDefault,
      exportJson,
      importJson,
    ],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
