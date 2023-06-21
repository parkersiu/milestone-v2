'use client'

import Board from "@/app/components/Board"
import { databases } from "@/appwrite";
import { resetServerContext } from 'react-beautiful-dnd';

export async function generateStaticParams() {

  const projects = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_PROJECTS_COLLECTION_ID,
  );

  return projects.documents.map((project) => ({
    id: project.id,
  }))
}

export default function Page({ params }) {

  const { id } = params;
  resetServerContext();

  return (
      <Board />
  )
}
