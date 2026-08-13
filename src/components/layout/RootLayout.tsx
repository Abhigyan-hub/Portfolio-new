import { Outlet, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageTransition } from '@/components/ui/Motion'

export function RootLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const isControlRoom = location.pathname.startsWith('/control-room')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        navigate('/control-room')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  if (isControlRoom) {
    return (
      <>
        <Outlet />
        <Analytics />
      </>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <Analytics />
    </div>
  )
}
