import { create } from 'zustand'
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { databases, ID, storage } from '@/appwrite';
import uploadImage from '@/lib/uploadImage';

export const useBoardStore = create((set, get) => ({
  board: {
    columns: new Map()
  },
  getBoard: async(projectId) => {
    const board = await getTodosGroupedByColumn(projectId);
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async(todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    )
  },
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
  newTaskInput: "",
  setNewTaskInput: (input) => set({ newTaskInput: input }),
  newTaskType: "todo",
  setNewTaskType: (columnId) => set({ newTaskType: columnId }),
  image: null,
  setImage: (image) => set({ image }),
  deleteTask: async (taskIndex, todo, id) => {
    const newColumns = new Map(get().board.columns);
    newColumns.get(id).todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns }});
    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
      todo.$id
    );
  },
  addTask: async(todo, columnId, image, projectId) => {
    let file;
    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        projectId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set({ newTaskInput: "" });

    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId).todos.push(newTodo);
      }
      return {
        board: {
          columns: newColumns,
        }
      }
    })

  }
}))
