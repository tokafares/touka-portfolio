import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@fontsource/instrument-serif/latin-400-italic.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { Layout } from './components/Layout'
import { LanguageProvider } from './i18n/LanguageProvider'
import './index.css'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ThemeProvider } from './theme/ThemeProvider'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      // Case studies are code-split: the home page doesn't need the gallery and lightbox code.
      { path: 'projects/:slug', lazy: () => import('./pages/ProjectPage').then((m) => ({ Component: m.ProjectPage })) },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root element')

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
