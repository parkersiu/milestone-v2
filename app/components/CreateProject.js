'use client'

import { useProjectStore } from "@/store/ProjectStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function CreateProject() {

  const [newProjectName, setNewProjectName, addProject, project] = useProjectStore((state) => [
    state.newProjectName,
    state.setNewProjectName,
    state.addProject,
    state.project,
  ]);

  const router = useRouter();

  const handleSubmit = (e => {
    e.preventDefault();
    if (!newProjectName) return;
    addProject(newProjectName);
    router.push(`/projects/${project['$id']}`)
  });

  return (
    <div className="mx-auto mt-6 text-center">
      <form onSubmit={handleSubmit}>
        <div className='mt-2 block'>
          <span className='block text-3xl font-medium leading-6 text-gray-900 pb-2'>
            Project Name:
          </span>
          <input type='text'
          value={newProjectName}
          onChange={e => setNewProjectName(e.target.value)}
          placeholder='Enter a project name...'
          className='border border-gray-300 rounded-md outline-none p-4 mt-4'
          />
        </div>

        <div className='mt-4'>
          <button
            type="submit"
            disabled={!newProjectName}
            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100
            px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100
            disabled:text-gray-300 disabled:cursor-not-allowed'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
