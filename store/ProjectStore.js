import { create } from 'zustand'
import { databases, ID } from '@/appwrite';
import { getProjectFromDB } from '@/lib/getProjectFromDB';

export const useProjectStore = create((set) => ({
  project: {
    name: '',
    $id: '',
    statuses: [],
  },
  setProjectState: (project) => set({ project }),
  getProject: async(id) => {
    const project = await getProjectFromDB(id);
    set({ project });
  },
  newProjectName: "",
  setNewProjectName: (input) => set({ newProjectName: input }),
  addProject: async(newProjectName) => {
    const newProject = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROJECTS_COLLECTION_ID,
      ID.unique(),
      {
        name: newProjectName,
        statuses: ['To Do', 'In Progress', 'Done'],
      }
    );

    set({ newProjectName: "" });
    set({ project: newProject});
  },
  projectNameInput: "",
  setProjectNameInput: (input) => set({ projectNameInput: input }),
  updateProjectInDB: async(projectId, name, statuses) => {
    const updatedProject = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROJECTS_COLLECTION_ID,
      projectId,
      {
        name,
        statuses,
      }
    );
    set({ project: updatedProject });
  },
  editedStatusArray: [],
  setEditedStatusArray: (input) => set({ editedStatusArray: [...input] }),
  newStatus: "",
  setNewStatus: (input) => set({ newStatus: input }),
}));
