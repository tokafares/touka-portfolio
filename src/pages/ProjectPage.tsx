import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock, Expand } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { GitHubIcon } from '../components/icons'
import { Lightbox } from '../components/Lightbox'
import { ProjectBadge } from '../components/ProjectBadge'
import { Reveal } from '../components/Reveal'
import { Screenshot, isMobileShot } from '../components/Screenshot'
import { findProject, projects, type Project } from '../data/projects'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../i18n/useI18n'
import { displayName } from '../lib/name'
import { button, container } from '../lib/ui'
import { NotFoundPage } from './NotFoundPage'

function SubHeading({ children }: { children: string }) {
  return <h2 className="label mb-5 text-accent">{children}</h2>
}

function ProjectView({ project }: { project: Project }) {
  const { t, locale, num } = useI18n()
  const copy = t.projects[project.slug]
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [returnFocusTo, setReturnFocusTo] = useState<HTMLElement | null>(null)

  useDocumentMeta({
    title: `${copy.name} · ${displayName(locale)}`,
    description: copy.oneLiner,
    path: `/projects/${project.slug}`,
    image: `/screenshots/${project.slug}/${project.cover}.webp`,
  })

  const images = project.screenshots.map((name) => ({ name, caption: copy.shots[name] ?? copy.name }))
  const desktopShots = images.map((image, index) => ({ ...image, index })).filter((s) => !isMobileShot(project.slug, s.name))
  const mobileShots = images.map((image, index) => ({ ...image, index })).filter((s) => isMobileShot(project.slug, s.name))

  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(currentIndex + 1) % projects.length] ?? projects[0]

  const openLightbox = (index: number, trigger: HTMLElement) => {
    setReturnFocusTo(trigger)
    setLightboxIndex(index)
  }
  const closeLightbox = () => {
    setLightboxIndex(null)
    returnFocusTo?.focus()
  }

  const thumbButton = 'group relative block w-full overflow-hidden rounded-2xl border border-line bg-surface-2 text-start transition-colors hover:border-line-strong'

  return (
    <article>
      {/* Header */}
      <div className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
        <div aria-hidden="true" className="bg-glow absolute inset-0 -z-10" />
        <div className={`${container} pt-8 pb-12 sm:pt-12 sm:pb-16`}>
          <Link to={{ pathname: '/', hash: '#work' }} className="mb-10 inline-flex items-center gap-2 rounded-full text-sm text-muted transition-colors hover:text-text">
            <ArrowLeft aria-hidden="true" className="flip-rtl size-4" />
            {t.project.back}
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <ProjectBadge concept={project.concept} />
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">{copy.name}</h1>
              <p className="mt-4 max-w-2xl text-lg text-pretty text-muted sm:text-xl">{copy.oneLiner}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className={button.primary}>
                  {t.project.liveDemo}
                  <ArrowUpRight aria-hidden="true" className="flip-rtl size-4" />
                  <span className="sr-only">{t.a11y.opensInNewTab}</span>
                </a>
              ) : (
                <span className="inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-line-strong px-5 text-sm text-muted">
                  <Clock aria-hidden="true" className="size-4" />
                  {t.project.comingSoon}
                </span>
              )}
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className={button.secondary}>
                <GitHubIcon className="size-4" />
                {t.project.sourceCode}
                <span className="sr-only">{t.a11y.opensInNewTab}</span>
              </a>
            </div>
          </div>

          <div className="hero-in hero-in-delay mt-12 overflow-hidden rounded-2xl border border-line bg-surface card-shadow">
            <div className="flex h-8 items-center gap-1.5 border-b border-line px-4" dir="ltr">
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
            </div>
            <Screenshot slug={project.slug} name={project.cover} alt={copy.shots[project.cover] ?? copy.name} sizes="(min-width: 1152px) 1120px, 100vw" eager className="block h-auto w-full" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={`${container} grid gap-14 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16`}>
        <div className="space-y-16">
          <Reveal>
            <SubHeading>{t.project.overview}</SubHeading>
            <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-pretty text-text/90">
              {copy.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 max-w-3xl rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
              {project.concept ? t.project.conceptNote : t.project.personalNote}
            </p>
          </Reveal>

          <Reveal>
            <SubHeading>{t.project.highlights}</SubHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.highlights.map((highlight, index) => (
                <div key={highlight.title} className="rounded-2xl border border-line bg-surface p-6">
                  <p className="label mb-3 text-muted">{num(index + 1, 2)}</p>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight">{highlight.title}</h3>
                  <p className="text-pretty text-muted">{highlight.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <SubHeading>{t.project.features}</SubHeading>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {copy.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                  </span>
                  <span className="text-text/90">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reveal className="rounded-2xl border border-line bg-surface p-6">
            <SubHeading>{t.project.stack}</SubHeading>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="rounded-lg border border-line bg-bg px-2.5 py-1.5 text-sm">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>

      {/* Gallery */}
      <section aria-labelledby="gallery-title" className="border-t border-line py-16 sm:py-20">
        <div className={container}>
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <h2 id="gallery-title" className="label text-accent">
              {t.project.gallery}
            </h2>
            <p className="text-sm text-muted">
              {t.project.galleryHint}
              {!project.liveUrl && ` ${t.project.localScreenshots}`}
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {desktopShots.map((shot) => (
              <li key={shot.name}>
                <figure>
                  <button type="button" onClick={(e) => openLightbox(shot.index, e.currentTarget)} aria-label={t.a11y.openImage(shot.caption)} className={thumbButton}>
                    <Screenshot slug={project.slug} name={shot.name} alt="" sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                    <span className="absolute end-3 top-3 grid size-8 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand aria-hidden="true" className="size-4" />
                    </span>
                  </button>
                  <figcaption className="mt-2.5 text-sm text-muted">{shot.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>

          {mobileShots.length > 0 && (
            <div className="mt-10">
              <h3 className="label mb-4 text-muted">{t.project.mobile}</h3>
              <ul className="flex flex-wrap gap-4">
                {mobileShots.map((shot) => (
                  <li key={shot.name} className="w-[min(15rem,70vw)]">
                    <figure>
                      <button type="button" onClick={(e) => openLightbox(shot.index, e.currentTarget)} aria-label={t.a11y.openImage(shot.caption)} className={`${thumbButton} rounded-[1.75rem] p-2`}>
                        <Screenshot slug={project.slug} name={shot.name} alt="" sizes="240px" className="aspect-[375/700] w-full rounded-[1.35rem] object-cover object-top" />
                      </button>
                      <figcaption className="mt-2.5 text-sm text-muted">{shot.caption}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Next project */}
      {next && next.slug !== project.slug && (
        <div className="border-t border-line">
          <Link to={`/projects/${next.slug}`} className={`${container} group flex items-center justify-between gap-6 py-12 sm:py-16`}>
            <span>
              <span className="label block text-muted">{t.project.next}</span>
              <span className="mt-2 block text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-4xl">{t.projects[next.slug].name}</span>
            </span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink sm:size-14">
              <ArrowRight aria-hidden="true" className="flip-rtl size-5" />
            </span>
          </Link>
        </div>
      )}

      <Lightbox slug={project.slug} images={images} index={lightboxIndex} onChange={setLightboxIndex} onClose={closeLightbox} />
    </article>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const project = findProject(slug)
  if (!project) return <NotFoundPage />
  // Keyed so lightbox state resets when moving to the next project.
  return <ProjectView key={project.slug} project={project} />
}
