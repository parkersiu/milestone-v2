import { create } from 'zustand'
import { databases, ID } from '@/appwrite';

export const useProjectStore = create((set) => ({
  project: {
    name: '',
    id: '',
    statuses: [],
  },
  getProject: async() => {
    const project = await getProjectFromDB();
    set({ project });
  },
  newProjectName: "",
  setNewProjectName: (input) => set({ newProjectName: input }),
  addProject: async(newProjectName) => {
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROJECTS_COLLECTION_ID,
      ID.unique(),
      {
        name: newProjectName,
        statuses: ['To Do', 'In Progress', 'Done'],
      }
    );

    set({ newProjectName: "" });
    console.log('project sent');
  },
}))
