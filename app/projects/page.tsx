import projectsData from '@/data/projectsData'
import Card from '@/components/ProjectCard'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <div className="mx-auto px-4 sm:px-6 xl:px-0">
      <div className="space-y-8 pt-16 pb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">
            Projects
          </h1>
          <p className="font-mono text-sm tracking-wider text-gray-500 dark:text-gray-400">
            Things I BUIDL!
          </p>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {projectsData.map((project) => (
            <div key={project.title} className="py-12">
              <Card
                title={project.title}
                description={project.description}
                imgSrc={project.imgSrc}
                href={project.href}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
