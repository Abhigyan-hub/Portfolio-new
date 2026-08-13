import { useMemo, useState } from 'react'
import type { Skill, SkillCategory } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const ORDER: SkillCategory[] = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Cloud / DevOps',
  'Computer Vision',
  'Hardware',
]

export function SkillsBoard({ skills }: { skills: Skill[] }) {
  const [active, setActive] = useState<SkillCategory | 'All'>('All')

  const grouped = useMemo(() => {
    const map = new Map<SkillCategory, Skill[]>()
    for (const cat of ORDER) map.set(cat, [])
    for (const skill of skills) {
      const list = map.get(skill.category) ?? []
      list.push(skill)
      map.set(skill.category, list)
    }
    for (const [cat, list] of map) {
      map.set(
        cat,
        [...list].sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name)),
      )
    }
    return map
  }, [skills])

  const categories = active === 'All' ? ORDER : [active]

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive('All')}
          className={cn(
            'rounded-md border px-3 py-1.5 text-sm transition-colors',
            active === 'All'
              ? 'border-accent bg-accent-dim text-accent'
              : 'border-border text-text-muted hover:border-accent hover:text-accent',
          )}
        >
          All
        </button>
        {ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              'rounded-md border px-3 py-1.5 text-sm transition-colors',
              active === cat
                ? 'border-accent bg-accent-dim text-accent'
                : 'border-border text-text-muted hover:border-accent hover:text-accent',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-10">
        {categories.map((cat) => {
          const list = grouped.get(cat) ?? []
          if (list.length === 0) return null
          return (
            <section key={cat}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-xl font-semibold">{cat}</h2>
                <Badge>{list.length}</Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((skill) => (
                  <div
                    key={skill.id}
                    className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-text">{skill.name}</p>
                      <span className="font-mono text-xs text-text-muted">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, skill.proficiency))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
