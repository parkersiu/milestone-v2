'use client'
import { databases } from "@/appwrite"
import { useEffect, useState } from "react"


export default function Page() {
  const [projects, setProjects] = useState([
    {
      id: 0,
      name: 'Create New Project',
      href: '/projects/create',
      class: 'group relative rounded-lg p-5 border-dashed border-2 border-slate-300 hover:bg-slate-200 hover:border-white hover:border-solid'
    }
  ]);
  const [projectsLength, setProjectsLength] = useState(0);

  const getProjects = async() => {
    const result = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROJECTS_COLLECTION_ID,
    )
    const mappedResult = result.documents.map(item => ({
      id: item['$id'],
      name: item.name,
      href: `/projects/${item['$id']}`,
      class: 'group relative rounded-lg p-5 bg-slate-300 hover:bg-slate-200'
    }));
    setProjects([...projects, ...mappedResult]);
    setProjectsLength(result.total);
    console.log(result);
    console.log(projects);
  }

  useEffect(() => {
    if (projectsLength === 0) {
      getProjects();
    }
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {projects.map((projects) => (
            <div key={projects.id} className={projects.class}>
              <div className="flex justify-center">
                <div>
                  <h3 className="text-md text-gray-700">
                    <a href={projects.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {projects.name}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
