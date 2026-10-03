import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../i18n/useI18n'
import { displayName } from '../lib/name'
import { Contact } from '../sections/Contact'
import { Hero } from '../sections/Hero'
import { Process } from '../sections/Process'
import { Services } from '../sections/Services'
import { Skills } from '../sections/Skills'
import { Work } from '../sections/Work'

export function HomePage() {
  const { t, locale } = useI18n()
  useDocumentMeta({ title: `${displayName(locale)} · ${t.meta.role}`, description: t.meta.description, path: '/' })

  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Skills />
      <Process />
      <Contact />
    </>
  )
}
