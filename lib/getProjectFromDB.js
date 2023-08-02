import { Databases, Query } from "appwrite";
import { databases } from "@/appwrite";


export const getProjectFromDB = async (id) => {


  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_PROJECTS_COLLECTION_ID,
    [
      Query.equal('$id', id)
    ]
  );

  const project = data.documents[0];


  return project;
}
