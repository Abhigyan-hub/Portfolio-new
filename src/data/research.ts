import type { ResearchEntry } from '@/types'

export const defaultResearch: ResearchEntry[] = [
  {
    id: 'research-1',
    slug: 'astar-vs-gccp-pathfinding',
    title: 'A* vs GCCP Pathfinding',
    objective:
      'Compare A* and GCCP pathfinding behavior under controlled obstacle-density conditions using repeated independent trials.',
    problemStatement:
      'Pathfinding algorithms can behave differently as environments become denser with obstacles. Single-run demos are insufficient for understanding reliability, search effort, and runtime trade-offs.',
    methodology:
      'Generate independent maps for each obstacle-density condition, run both algorithms, and aggregate statistical metrics across repeated trials rather than relying on anecdotal runs.',
    experimentalSetup:
      'For each obstacle-density condition, evaluate 100 independent maps. Collect success outcomes, node-expansion statistics, variability measures, and mean execution time for comparative analysis.',
    metrics: [
      { label: 'Success rate', description: 'Fraction of maps successfully solved per condition.' },
      { label: 'Mean nodes', description: 'Average nodes expanded across successful/attempted runs.' },
      { label: 'Median nodes', description: 'Median node expansion to reduce outlier skew.' },
      { label: 'Standard deviation', description: 'Variability of node expansion across maps.' },
      { label: 'Mean execution time', description: 'Average runtime per condition and algorithm.' },
    ],
    findings: [
      'Obstacle density materially affects search effort and reliability.',
      'Repeated trials (100 maps/condition) provide a stronger comparative signal than single demos.',
      'Mean/median/stddev together give a clearer picture than runtime alone.',
    ],
    conclusions:
      'Controlled, repeated experimentation is essential for comparing pathfinding algorithms across density regimes. Detailed numeric graphs can be attached as results become finalized.',
    futureWork: [
      'Expand algorithm set beyond A* and GCCP',
      'Study larger grids and dynamic obstacles',
      'Publish interactive result visualizations in this portfolio',
    ],
    year: 2024,
    relatedProjectSlug: 'astar-vs-gccp-pathfinding',
  },
]
