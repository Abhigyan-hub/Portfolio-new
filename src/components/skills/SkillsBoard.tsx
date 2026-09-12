import { useMemo } from 'react'
import { Layers } from 'lucide-react'
import type { Skill, SkillCategory } from '@/types'
import { categoryTone, proficiencyToLevel } from '@/lib/skills'
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

function SkillPill({
  skill,
  compact = false,
}: {
  skill: Skill
  compact?: boolean
}) {
  const level = proficiencyToLevel(skill.proficiency)
  const tone = categoryTone[skill.category]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border font-medium shadow-[0_1px_2px_rgba(10,37,64,0.04)]',
        tone.pill,
        compact ? 'px-3 py-1 text-xs' : 'px-3.5 py-1.5 text-sm',
      )}
    >
      <span className="font-semibold">{skill.name}</span>
      <span className={cn('font-medium opacity-75', tone.label)}>
        {compact ? `· ${level}` : level}
      </span>
    </span>
  )
}

export function SkillsBoard({ skills }: { skills: Skill[] }) {
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

  const activeCategories = ORDER.filter((cat) => (grouped.get(cat) ?? []).length > 0)
  const allSkills = useMemo(
    () =>
      activeCategories.flatMap((cat) => grouped.get(cat) ?? []),
    [activeCategories, grouped],
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activeCategories.map((cat) => {
          const list = grouped.get(cat) ?? []
          return (
            <section
              key={cat}
              className="soft-panel flex flex-col rounded-2xl p-5 sm:p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={cn('h-1.5 w-1.5 rounded-full', categoryTone[cat].dot)}
                  aria-hidden
                />
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                  {cat}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {list.map((skill) => (
                  <SkillPill key={skill.id} skill={skill} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <section className="soft-panel rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Layers size={14} className="text-accent" aria-hidden />
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            All skills
          </h2>
          <span className="rounded-full bg-bg-elevated px-2 py-0.5 text-xs font-medium text-text-muted">
            {allSkills.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <SkillPill key={`all-${skill.id}`} skill={skill} compact />
          ))}
        </div>
      </section>
    </div>
  )
}
