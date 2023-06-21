import { Databases, Query } from "appwrite";
import { databases } from "@/appwrite";


export const getProjectFromDB = async () => {


  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_PROJECTS_COLLECTION_ID,
    [
      Query.equal('$id', '648cbc6cab24411652d5')
    ]
  );

  const project = data.documents[0];
  console.log(project);


  return project;
}
