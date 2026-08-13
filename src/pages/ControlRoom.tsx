import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Copy,
  Download,
  ExternalLink,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import { usePortfolio } from '@/hooks/usePortfolio'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Button } from '@/components/ui/Button'
import { Input, Label, Select, Textarea } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { slugify } from '@/lib/utils'
import type {
  Experience,
  Project,
  ProjectCategory,
  ProjectStatus,
  ResearchEntry,
  Skill,
  SkillCategory,
} from '@/types'

type Tab = 'dashboard' | 'projects' | 'skills' | 'experience' | 'research'

const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Full Stack',
  'Mobile',
  'Computer Vision',
  'Research',
  'Robotics',
  'IoT',
  'Hardware',
  'Systems',
]

const PROJECT_STATUSES: ProjectStatus[] = ['Completed', 'In Progress', 'Concept', 'Research']

const SKILL_CATEGORIES: SkillCategory[] = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Cloud / DevOps',
  'Computer Vision',
  'Hardware',
]

function emptyProject(order: number): Project {
  return {
    id: crypto.randomUUID(),
    slug: 'new-project',
    title: 'New Project',
    shortDescription: '',
    detailedDescription: '',
    technologies: [],
    category: 'Full Stack',
    status: 'Concept',
    year: new Date().getFullYear(),
    featured: false,
    features: [],
    order,
  }
}

export function ControlRoomPage() {
  usePageMeta('Control Room', 'Local portfolio content editor.')
  const {
    data,
    hasLocalChanges,
    updateProjects,
    updateSkills,
    updateExperience,
    updateResearch,
    resetToDefault,
    exportJson,
    importJson,
  } = usePortfolio()

  const [tab, setTab] = useState<Tab>('dashboard')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    data.projects[0]?.id ?? null,
  )
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(data.skills[0]?.id ?? null)
  const [selectedExpId, setSelectedExpId] = useState<string | null>(data.experience[0]?.id ?? null)
  const [selectedResearchId, setSelectedResearchId] = useState<string | null>(
    data.research[0]?.id ?? null,
  )
  const [message, setMessage] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const selectedProject = useMemo(
    () => data.projects.find((p) => p.id === selectedProjectId) ?? null,
    [data.projects, selectedProjectId],
  )
  const selectedSkill = useMemo(
    () => data.skills.find((s) => s.id === selectedSkillId) ?? null,
    [data.skills, selectedSkillId],
  )
  const selectedExp = useMemo(
    () => data.experience.find((e) => e.id === selectedExpId) ?? null,
    [data.experience, selectedExpId],
  )
  const selectedResearch = useMemo(
    () => data.research.find((r) => r.id === selectedResearchId) ?? null,
    [data.research, selectedResearchId],
  )

  const categoriesCount = new Set(data.projects.map((p) => p.category)).size
  const featuredCount = data.projects.filter((p) => p.featured).length

  const flash = (text: string) => {
    setMessage(text)
    window.setTimeout(() => setMessage(''), 2500)
  }

  const patchProject = (patch: Partial<Project>) => {
    if (!selectedProject) return
    updateProjects(
      data.projects.map((p) => (p.id === selectedProject.id ? { ...p, ...patch } : p)),
    )
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-bg-elevated">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Control Room</p>
            <h1 className="text-xl font-semibold">Local content editor</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={14} /> Site
              </Button>
            </Link>
            <Button variant="secondary" size="sm" onClick={exportJson}>
              <Download size={14} /> Export JSON
            </Button>
            <Button variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
              <Upload size={14} /> Import JSON
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                if (confirm('Reset all local changes to default data?')) {
                  resetToDefault()
                  flash('Reset to defaults')
                }
              }}
            >
              <RotateCcw size={14} /> Reset
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                try {
                  await importJson(file)
                  flash('Imported JSON')
                } catch {
                  flash('Invalid JSON')
                }
                e.target.value = ''
              }}
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="rounded-lg border border-border bg-accent-dim px-4 py-3 text-sm text-text">
          Local changes are stored in this browser only. This panel is not secure authentication —
          it is a local editor. Publishing requires updating source data or redeploying.
          {hasLocalChanges && (
            <span className="ml-2 font-mono text-xs text-accent">· local overrides active</span>
          )}
        </div>
        {message && (
          <p className="mt-3 font-mono text-sm text-accent" role="status">
            {message}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {(
            [
              ['dashboard', 'Dashboard'],
              ['projects', 'Projects'],
              ['skills', 'Skills'],
              ['experience', 'Experience'],
              ['research', 'Research'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                tab === id
                  ? 'border-accent bg-accent-dim text-accent'
                  : 'border-border text-text-muted hover:border-accent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Total projects', data.projects.length],
              ['Featured projects', featuredCount],
              ['Skills', data.skills.length],
              ['Categories', categoriesCount],
              ['Experience entries', data.experience.length],
              ['Research entries', data.research.length],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-lg border border-border bg-surface p-5">
                <p className="font-mono text-xs text-text-muted">{label}</p>
                <p className="mt-2 text-3xl font-semibold">{value}</p>
              </div>
            ))}
            <div className="rounded-lg border border-border bg-surface p-5 sm:col-span-2 lg:col-span-3">
              <p className="font-mono text-xs text-text-muted">Portfolio version</p>
              <p className="mt-2 font-mono text-lg text-accent">{data.version}</p>
              <p className="mt-4 text-sm text-text-muted">
                Vercel Analytics lives in the Vercel dashboard (not fetched client-side without a
                backend).
              </p>
              <a
                href={siteConfig.vercelAnalyticsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block"
              >
                <Button variant="secondary" size="sm">
                  <ExternalLink size={14} /> Open Vercel Analytics
                </Button>
              </a>
            </div>
          </div>
        )}

        {tab === 'projects' && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="rounded-lg border border-border bg-surface p-3">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-mono text-xs text-text-muted">Projects</p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    const next = emptyProject(data.projects.length + 1)
                    updateProjects([...data.projects, next])
                    setSelectedProjectId(next.id)
                  }}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <div className="max-h-[70vh] space-y-1 overflow-auto">
                {[...data.projects]
                  .sort((a, b) => a.order - b.order)
                  .map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProjectId(p.id)}
                      className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                        selectedProjectId === p.id
                          ? 'bg-accent-dim text-accent'
                          : 'hover:bg-bg'
                      }`}
                    >
                      {p.title}
                      {p.featured && (
                        <Badge className="ml-2">F</Badge>
                      )}
                    </button>
                  ))}
              </div>
            </div>

            {selectedProject ? (
              <div className="space-y-4 rounded-lg border border-border bg-surface p-5">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const copy: Project = {
                        ...structuredClone(selectedProject),
                        id: crypto.randomUUID(),
                        title: `${selectedProject.title} (copy)`,
                        slug: `${selectedProject.slug}-copy`,
                        order: data.projects.length + 1,
                      }
                      updateProjects([...data.projects, copy])
                      setSelectedProjectId(copy.id)
                      flash('Duplicated')
                    }}
                  >
                    <Copy size={14} /> Duplicate
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      if (!confirm('Delete this project?')) return
                      const next = data.projects.filter((p) => p.id !== selectedProject.id)
                      updateProjects(next)
                      setSelectedProjectId(next[0]?.id ?? null)
                    }}
                  >
                    <Trash2 size={14} /> Delete
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={selectedProject.title}
                      onChange={(e) => {
                        const title = e.target.value
                        patchProject({ title, slug: slugify(title) || selectedProject.slug })
                      }}
                    />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input
                      value={selectedProject.slug}
                      onChange={(e) => patchProject({ slug: slugify(e.target.value) })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Short description</Label>
                    <Textarea
                      value={selectedProject.shortDescription}
                      onChange={(e) => patchProject({ shortDescription: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Detailed description</Label>
                    <Textarea
                      value={selectedProject.detailedDescription}
                      onChange={(e) => patchProject({ detailedDescription: e.target.value })}
                      rows={5}
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={selectedProject.category}
                      onChange={(e) =>
                        patchProject({ category: e.target.value as ProjectCategory })
                      }
                    >
                      {PROJECT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={selectedProject.status}
                      onChange={(e) =>
                        patchProject({ status: e.target.value as ProjectStatus })
                      }
                    >
                      {PROJECT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input
                      type="number"
                      value={selectedProject.year}
                      onChange={(e) => patchProject({ year: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Order</Label>
                    <Input
                      type="number"
                      value={selectedProject.order}
                      onChange={(e) => patchProject({ order: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>GitHub URL</Label>
                    <Input
                      value={selectedProject.githubUrl ?? ''}
                      onChange={(e) => patchProject({ githubUrl: e.target.value || undefined })}
                    />
                  </div>
                  <div>
                    <Label>Demo URL</Label>
                    <Input
                      value={selectedProject.demoUrl ?? ''}
                      onChange={(e) => patchProject({ demoUrl: e.target.value || undefined })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Image URL</Label>
                    <Input
                      value={selectedProject.image ?? ''}
                      onChange={(e) => patchProject({ image: e.target.value || undefined })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Technologies (comma-separated)</Label>
                    <Input
                      value={selectedProject.technologies.join(', ')}
                      onChange={(e) =>
                        patchProject({
                          technologies: e.target.value
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Features (one per line)</Label>
                    <Textarea
                      value={selectedProject.features.join('\n')}
                      onChange={(e) =>
                        patchProject({
                          features: e.target.value
                            .split('\n')
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedProject.featured}
                        onChange={(e) => patchProject({ featured: e.target.checked })}
                      />
                      Featured
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-10 text-center text-text-muted">
                No project selected
              </div>
            )}
          </div>
        )}

        {tab === 'skills' && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="rounded-lg border border-border bg-surface p-3">
              <div className="mb-3 flex justify-between">
                <p className="font-mono text-xs text-text-muted">Skills</p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    const skill: Skill = {
                      id: crypto.randomUUID(),
                      name: 'New skill',
                      category: 'Languages',
                      proficiency: 70,
                      priority: data.skills.length + 1,
                    }
                    updateSkills([...data.skills, skill])
                    setSelectedSkillId(skill.id)
                  }}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <div className="max-h-[70vh] space-y-1 overflow-auto">
                {data.skills.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSkillId(s.id)}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                      selectedSkillId === s.id ? 'bg-accent-dim text-accent' : 'hover:bg-bg'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
            {selectedSkill ? (
              <div className="space-y-4 rounded-lg border border-border bg-surface p-5">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    const next = data.skills.filter((s) => s.id !== selectedSkill.id)
                    updateSkills(next)
                    setSelectedSkillId(next[0]?.id ?? null)
                  }}
                >
                  <Trash2 size={14} /> Delete
                </Button>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={selectedSkill.name}
                      onChange={(e) =>
                        updateSkills(
                          data.skills.map((s) =>
                            s.id === selectedSkill.id ? { ...s, name: e.target.value } : s,
                          ),
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={selectedSkill.category}
                      onChange={(e) =>
                        updateSkills(
                          data.skills.map((s) =>
                            s.id === selectedSkill.id
                              ? { ...s, category: e.target.value as SkillCategory }
                              : s,
                          ),
                        )
                      }
                    >
                      {SKILL_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label>Proficiency</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={selectedSkill.proficiency}
                      onChange={(e) =>
                        updateSkills(
                          data.skills.map((s) =>
                            s.id === selectedSkill.id
                              ? { ...s, proficiency: Number(e.target.value) }
                              : s,
                          ),
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Input
                      type="number"
                      value={selectedSkill.priority}
                      onChange={(e) =>
                        updateSkills(
                          data.skills.map((s) =>
                            s.id === selectedSkill.id
                              ? { ...s, priority: Number(e.target.value) }
                              : s,
                          ),
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-10 text-center text-text-muted">
                No skill selected
              </div>
            )}
          </div>
        )}

        {tab === 'experience' && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="rounded-lg border border-border bg-surface p-3">
              <div className="mb-3 flex justify-between">
                <p className="font-mono text-xs text-text-muted">Experience</p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    const entry: Experience = {
                      id: crypto.randomUUID(),
                      organization: 'Organization',
                      position: 'Role',
                      startDate: 'YYYY-MM',
                      endDate: 'Present',
                      description: '',
                      technologies: [],
                      achievements: [],
                      order: data.experience.length + 1,
                    }
                    updateExperience([...data.experience, entry])
                    setSelectedExpId(entry.id)
                  }}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <div className="space-y-1">
                {data.experience.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelectedExpId(e.id)}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                      selectedExpId === e.id ? 'bg-accent-dim text-accent' : 'hover:bg-bg'
                    }`}
                  >
                    {e.position}
                  </button>
                ))}
              </div>
            </div>
            {selectedExp ? (
              <div className="space-y-4 rounded-lg border border-border bg-surface p-5">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    const next = data.experience.filter((e) => e.id !== selectedExp.id)
                    updateExperience(next)
                    setSelectedExpId(next[0]?.id ?? null)
                  }}
                >
                  <Trash2 size={14} /> Delete
                </Button>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(
                    [
                      ['organization', 'Organization'],
                      ['position', 'Position'],
                      ['startDate', 'Start date'],
                      ['endDate', 'End date'],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <Label>{label}</Label>
                      <Input
                        value={selectedExp[key]}
                        onChange={(e) =>
                          updateExperience(
                            data.experience.map((item) =>
                              item.id === selectedExp.id
                                ? { ...item, [key]: e.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={selectedExp.description}
                      onChange={(e) =>
                        updateExperience(
                          data.experience.map((item) =>
                            item.id === selectedExp.id
                              ? { ...item, description: e.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Technologies (comma-separated)</Label>
                    <Input
                      value={selectedExp.technologies.join(', ')}
                      onChange={(e) =>
                        updateExperience(
                          data.experience.map((item) =>
                            item.id === selectedExp.id
                              ? {
                                  ...item,
                                  technologies: e.target.value
                                    .split(',')
                                    .map((t) => t.trim())
                                    .filter(Boolean),
                                }
                              : item,
                          ),
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Order</Label>
                    <Input
                      type="number"
                      value={selectedExp.order}
                      onChange={(e) =>
                        updateExperience(
                          data.experience.map((item) =>
                            item.id === selectedExp.id
                              ? { ...item, order: Number(e.target.value) }
                              : item,
                          ),
                        )
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Achievements (one per line)</Label>
                    <Textarea
                      value={selectedExp.achievements.join('\n')}
                      onChange={(e) =>
                        updateExperience(
                          data.experience.map((item) =>
                            item.id === selectedExp.id
                              ? {
                                  ...item,
                                  achievements: e.target.value
                                    .split('\n')
                                    .map((t) => t.trim())
                                    .filter(Boolean),
                                }
                              : item,
                          ),
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-10 text-center text-text-muted">
                No experience selected
              </div>
            )}
          </div>
        )}

        {tab === 'research' && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="rounded-lg border border-border bg-surface p-3">
              <div className="mb-3 flex justify-between">
                <p className="font-mono text-xs text-text-muted">Research</p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    const entry: ResearchEntry = {
                      id: crypto.randomUUID(),
                      slug: 'new-research',
                      title: 'New research',
                      objective: '',
                      problemStatement: '',
                      methodology: '',
                      experimentalSetup: '',
                      metrics: [],
                      findings: [],
                      conclusions: '',
                      futureWork: [],
                      year: new Date().getFullYear(),
                    }
                    updateResearch([...data.research, entry])
                    setSelectedResearchId(entry.id)
                  }}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <div className="space-y-1">
                {data.research.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedResearchId(r.id)}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                      selectedResearchId === r.id ? 'bg-accent-dim text-accent' : 'hover:bg-bg'
                    }`}
                  >
                    {r.title}
                  </button>
                ))}
              </div>
            </div>
            {selectedResearch ? (
              <div className="space-y-4 rounded-lg border border-border bg-surface p-5">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    const next = data.research.filter((r) => r.id !== selectedResearch.id)
                    updateResearch(next)
                    setSelectedResearchId(next[0]?.id ?? null)
                  }}
                >
                  <Trash2 size={14} /> Delete
                </Button>
                <div className="grid gap-4">
                  {(
                    [
                      ['title', 'Title'],
                      ['slug', 'Slug'],
                      ['objective', 'Objective'],
                      ['problemStatement', 'Problem statement'],
                      ['methodology', 'Methodology'],
                      ['experimentalSetup', 'Experimental setup'],
                      ['conclusions', 'Conclusions'],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <Label>{label}</Label>
                      {key === 'title' || key === 'slug' ? (
                        <Input
                          value={selectedResearch[key]}
                          onChange={(e) =>
                            updateResearch(
                              data.research.map((r) =>
                                r.id === selectedResearch.id
                                  ? {
                                      ...r,
                                      [key]:
                                        key === 'slug' ? slugify(e.target.value) : e.target.value,
                                    }
                                  : r,
                              ),
                            )
                          }
                        />
                      ) : (
                        <Textarea
                          value={selectedResearch[key]}
                          onChange={(e) =>
                            updateResearch(
                              data.research.map((r) =>
                                r.id === selectedResearch.id
                                  ? { ...r, [key]: e.target.value }
                                  : r,
                              ),
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                  <div>
                    <Label>Findings (one per line)</Label>
                    <Textarea
                      value={selectedResearch.findings.join('\n')}
                      onChange={(e) =>
                        updateResearch(
                          data.research.map((r) =>
                            r.id === selectedResearch.id
                              ? {
                                  ...r,
                                  findings: e.target.value
                                    .split('\n')
                                    .map((t) => t.trim())
                                    .filter(Boolean),
                                }
                              : r,
                          ),
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Future work (one per line)</Label>
                    <Textarea
                      value={selectedResearch.futureWork.join('\n')}
                      onChange={(e) =>
                        updateResearch(
                          data.research.map((r) =>
                            r.id === selectedResearch.id
                              ? {
                                  ...r,
                                  futureWork: e.target.value
                                    .split('\n')
                                    .map((t) => t.trim())
                                    .filter(Boolean),
                                }
                              : r,
                          ),
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input
                      type="number"
                      value={selectedResearch.year}
                      onChange={(e) =>
                        updateResearch(
                          data.research.map((r) =>
                            r.id === selectedResearch.id
                              ? { ...r, year: Number(e.target.value) }
                              : r,
                          ),
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-10 text-center text-text-muted">
                No research selected
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
