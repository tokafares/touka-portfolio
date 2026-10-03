import { Database, Monitor, Server, Wrench, type LucideIcon } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { skillGroupIds, skills, type SkillGroupId } from '../data/skills'
import { useI18n } from '../i18n/useI18n'
import { container } from '../lib/ui'

const icons: Record<SkillGroupId, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  tools: Wrench,
}

export function Skills() {
  const { t } = useI18n()
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-20 sm:py-28">
      <div className={container}>
        <SectionHeading id="skills" index={3} eyebrow={t.skills.eyebrow} title={t.skills.title} intro={t.skills.intro} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroupIds.map((id, index) => {
            const Icon = icons[id]
            return (
              <Reveal key={id} delay={index * 70} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="mb-5 flex items-center gap-2.5 font-semibold tracking-tight">
                  <Icon aria-hidden="true" className="size-4 text-accent" strokeWidth={1.75} />
                  {t.skills.groups[id]}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {skills[id].map((skill) => (
                    <li key={skill} className="rounded-lg border border-line bg-bg px-2.5 py-1.5 text-sm text-text/90">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
