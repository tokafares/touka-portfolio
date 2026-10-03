import type { ProjectSlug } from '../data/projects'
import type { ServiceId } from '../data/services'
import type { SkillGroupId } from '../data/skills'
import type { ChannelId } from '../lib/contact'

export type Locale = 'en' | 'ar'

/**
 * Text wrapped in *asterisks* is rendered with emphasis (see <Emphasis>).
 * Every locale must implement this interface, so a missing string is a compile error.
 */
export interface ProjectCopy {
  name: string
  oneLiner: string
  overview: readonly string[]
  features: readonly string[]
  highlights: readonly { title: string; body: string }[]
  /** Caption for each screenshot, keyed by file name. */
  shots: Readonly<Record<string, string>>
}

export interface SectionCopy {
  eyebrow: string
  title: string
  intro: string
}

export interface Translations {
  meta: {
    role: string
    description: string
  }
  a11y: {
    skipToContent: string
    mainNav: string
    openMenu: string
    closeMenu: string
    switchLanguage: string
    themeToDark: string
    themeToLight: string
    opensInNewTab: string
    openImage: (caption: string) => string
    closeGallery: string
    previousImage: string
    nextImage: string
    imageCount: (current: number, total: number) => string
  }
  nav: {
    services: string
    work: string
    skills: string
    process: string
    contact: string
  }
  languageToggle: string
  hero: {
    available: string
    role: string
    lead: string
    viewProjects: string
    contactMe: string
    specFile: string
    spec: {
      focus: [string, string]
      stack: [string, string]
      languages: [string, string]
      availability: [string, string]
    }
  }
  services: SectionCopy & {
    items: Record<ServiceId, { title: string; body: string }>
  }
  work: SectionCopy & {
    concept: string
    personal: string
    caseStudy: string
    live: string
    code: string
    comingSoon: string
    moreTech: (count: number) => string
  }
  skills: SectionCopy & {
    groups: Record<SkillGroupId, string>
  }
  process: SectionCopy & {
    steps: readonly { title: string; body: string }[]
  }
  contact: SectionCopy & {
    channelsTitle: string
    channels: Record<ChannelId, string>
    form: {
      title: string
      name: string
      namePlaceholder: string
      type: string
      types: Record<'landing' | 'dashboards' | 'ecommerce' | 'booking' | 'rtl' | 'other', string>
      message: string
      messagePlaceholder: string
      submit: string
      note: string
      errors: { name: string; message: string }
      subject: (type: string, name: string) => string
      body: (message: string, type: string, name: string) => string
      opened: string
    }
  }
  footer: {
    builtWith: string
    backToTop: string
    source: string
  }
  project: {
    back: string
    overview: string
    features: string
    stack: string
    highlights: string
    gallery: string
    galleryHint: string
    liveDemo: string
    sourceCode: string
    comingSoon: string
    conceptNote: string
    personalNote: string
    localScreenshots: string
    next: string
    mobile: string
  }
  notFound: {
    title: string
    body: string
    home: string
  }
  projects: Record<ProjectSlug, ProjectCopy>
}
