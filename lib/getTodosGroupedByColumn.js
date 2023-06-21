import { databases } from "@/appwrite";
import { Query } from "appwrite";


export const getTodosGroupedByColumn = async (projectId) => {


  const statuses = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_PROJECTS_COLLECTION_ID,
    [
      Query.equal('$id', projectId)
    ]
  )

  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
    [
      // requires index in db
      Query.equal('projectId', projectId)
    ]
  );

  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: []
      })
    }

    acc.get(todo.status).todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) })
    })
    return acc;
  }, new Map);

  const columnTypes = statuses.documents[0].statuses;

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  const board = {
    columns
  }

  return board;
}
