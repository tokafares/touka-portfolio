import { ArrowUpRight, Clock } from 'lucide-react'
import { Link } from 'react-router'
import type { Project } from '../data/projects'
import { useI18n } from '../i18n/useI18n'
import { button, chip } from '../lib/ui'
import { GitHubIcon } from './icons'
import { ProjectBadge } from './ProjectBadge'
import { Screenshot } from './Screenshot'

const MAX_TAGS = 5

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { t, locale } = useI18n()
  const copy = t.projects[project.slug]
  const to = `/projects/${project.slug}`
  const extraTags = project.tech.length - MAX_TAGS

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface card-shadow transition-colors duration-300 hover:border-line-strong ${
        featured ? 'lg:grid lg:grid-cols-[1.35fr_1fr]' : ''
      }`}
    >
      {/* Screenshot in a minimal browser frame. The whole image links to the case study. */}
      <Link to={to} tabIndex={-1} aria-hidden="true" className={`block bg-surface-2 p-3 pb-0 sm:p-4 sm:pb-0 ${featured ? 'lg:p-6 lg:pe-0' : ''}`}>
        <div className={`overflow-hidden rounded-t-xl border border-b-0 border-line bg-bg ${featured ? 'lg:rounded-e-none lg:border-e-0' : ''}`}>
          <div className="flex h-7 items-center gap-1.5 border-b border-line px-3" dir="ltr">
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
          </div>
          <div className="aspect-[16/10] overflow-hidden">
            <Screenshot
              slug={project.slug}
              name={project.cover}
              alt=""
              sizes={featured ? '(min-width: 1024px) 620px, 100vw' : '(min-width: 1024px) 540px, 100vw'}
              className="size-full object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </Link>

      <div className={`flex flex-1 flex-col gap-4 p-5 sm:p-6 ${featured ? 'lg:justify-center lg:p-10' : ''}`}>
        <ProjectBadge concept={project.concept} />
        <div className="space-y-2">
          <h3 className={`font-semibold tracking-tight ${featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            <Link to={to} className="rounded-md after:absolute after:inset-0 after:content-[''] hover:text-accent">
              {copy.name}
            </Link>
          </h3>
          <p className="text-pretty text-muted">{copy.oneLiner}</p>
        </div>

        <ul className="flex flex-wrap gap-1.5" aria-label={t.project.stack}>
          {project.tech.slice(0, MAX_TAGS).map((tech) => (
            <li key={tech} className={chip}>
              {tech}
            </li>
          ))}
          {extraTags > 0 && (
            <li className={chip} lang={locale}>
              {t.work.moreTech(extraTags)}
            </li>
          )}
        </ul>

        {/* Buttons sit above the stretched card link. */}
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2 pt-2">
          <Link to={to} className={button.smallPrimary}>
            {t.work.caseStudy}
            <ArrowUpRight aria-hidden="true" className="flip-rtl size-3.5" />
          </Link>
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className={button.small}>
              {t.work.live}
              <span className="sr-only">
                {' '}
                {copy.name} {t.a11y.opensInNewTab}
              </span>
            </a>
          ) : (
            <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-dashed border-line-strong px-3.5 text-[0.8125rem] text-muted">
              <Clock aria-hidden="true" className="size-3.5" />
              {t.work.comingSoon}
            </span>
          )}
          <a href={project.repoUrl} target="_blank" rel="noreferrer" className={button.small}>
            <GitHubIcon className="size-3.5" />
            {t.work.code}
            <span className="sr-only">
              {' '}
              {copy.name} {t.a11y.opensInNewTab}
            </span>
          </a>
        </div>
      </div>
    </article>
  )
}
