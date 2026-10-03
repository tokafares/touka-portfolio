import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { projects } from '../data/projects'
import { useI18n } from '../i18n/useI18n'
import { container } from '../lib/ui'

export function Work() {
  const { t } = useI18n()
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line py-20 sm:py-28">
      <div className={container}>
        <SectionHeading id="work" index={2} eyebrow={t.work.eyebrow} title={t.work.title} intro={t.work.intro} />
        <ul className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.slug} className={index === 0 ? 'lg:col-span-2' : ''}>
              <Reveal delay={index === 0 ? 0 : (index % 2) * 80} className="h-full">
                <ProjectCard project={project} featured={index === 0} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
