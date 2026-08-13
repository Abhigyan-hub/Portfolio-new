import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { ThemeProvider } from '@/hooks/useTheme'
import { PortfolioProvider } from '@/hooks/usePortfolio'

const HomePage = lazy(() =>
  import('@/pages/Home').then((m) => ({ default: m.HomePage })),
)
const AboutPage = lazy(() =>
  import('@/pages/About').then((m) => ({ default: m.AboutPage })),
)
const ProjectsPage = lazy(() =>
  import('@/pages/Projects').then((m) => ({ default: m.ProjectsPage })),
)
const ProjectDetailPage = lazy(() =>
  import('@/pages/ProjectDetail').then((m) => ({ default: m.ProjectDetailPage })),
)
const SkillsPage = lazy(() =>
  import('@/pages/Skills').then((m) => ({ default: m.SkillsPage })),
)
const ResearchPage = lazy(() =>
  import('@/pages/Research').then((m) => ({ default: m.ResearchPage })),
)
const ExperiencePage = lazy(() =>
  import('@/pages/Experience').then((m) => ({ default: m.ExperiencePage })),
)
const ContactPage = lazy(() =>
  import('@/pages/Contact').then((m) => ({ default: m.ContactPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage })),
)
const ControlRoomPage = lazy(() =>
  import('@/pages/ControlRoom').then((m) => ({ default: m.ControlRoomPage })),
)

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center font-mono text-sm text-text-muted">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:slug" element={<ProjectDetailPage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="research" element={<ResearchPage />} />
                <Route path="experience" element={<ExperiencePage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="control-room" element={<ControlRoomPage />} />
                <Route path="404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PortfolioProvider>
    </ThemeProvider>
  )
}
