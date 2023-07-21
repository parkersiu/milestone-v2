import Board from "./components/Board"

export default function Home() {

  const stats = [
  { id: 1, name: 'Framework', value: 'Next.js' },
  { id: 2, name: 'Styling', value: 'Tailwind CSS' },
  { id: 3, name: 'Storage', value: 'Appwrite'}
]

  return (
    <main>
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24">
          <div className="flex flex-col justify-center mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="mx-auto sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Welcome to Milestone
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                A full stack application designed for users to manage a project.
              </p>
            </div>
            <div className="mx-auto">
              <div className="mt-10">
                <a
                  href="/projects/648cbc6cab24411652d5"
                  className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  View Demo Project
                </a>
              </div>
            </div>
            <div className="bg-white py-12 sm:py-16">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                      <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
