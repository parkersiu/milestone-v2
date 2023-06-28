'use client'

import React from "react";
import { MagnifyingGlassIcon, UserCircleIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";
import { useProjectStore } from "@/store/ProjectStore";
import { useEffect, useState } from "react";

export default function Header({ projectName }) {

  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [openSettingsModal] = useModalStore((state) => [state.openSettingsModal]);

  const [project, setProjectNameInput, editedStatusArray, setEditedStatusArray] = useProjectStore((state) => [
    state.project,
    state.setProjectNameInput,
    state.editedStatusArray,
    state.setEditedStatusArray,
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    setEditedStatusArray(project.statuses);
  }, [board, project.statuses, setEditedStatusArray]);


  const handleSettings = () => {
    setProjectNameInput(projectName);
    openSettingsModal();
  }


  return(
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-400 to-[#0055D1]
        rounded-md filter blur-3xl opacity-50 -z-50"></div>

        <div className="flex items-center space-x-5 flex-1 justify-between w-full">
          <h1 className="text-3xl font-bold">{projectName ? projectName : 'Project'}</h1>
          <div className="flex items-center justify-between">
            <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md
            flex-1 md:flex-initial">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
              <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              value={searchString}
              onChange={e => setSearchString(e.target.value)}
              />
              <button hidden type="submit">Search</button>
            </form>
            <button onClick={handleSettings}>
              <Cog8ToothIcon className="h-6 w-6 m-1" />
            </button>
          </div>
        </div>
      </div>

    </header>
  )
}
