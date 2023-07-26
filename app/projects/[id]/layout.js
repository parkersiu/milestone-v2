'use client'

import Header from "@/app/components/Header"
import Modal from "@/app/components/Modal"
import SettingsModal from "@/app/components/SettingsModal"
import { useProjectStore } from "@/store/ProjectStore"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function DynamicProjectsLayout({
  children,
}) {

  const [project, getProject] = useProjectStore((state) => [
    state.project,
    state.getProject,
  ]);

  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, [params.id, getProject]);

  const projectName = project.name;

  return (
    <div className="">
      <Header projectName={projectName} />
      {children}
      <Modal />
      <SettingsModal />
    </div>
  )
}
