'use client';

import { useState, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore';
import { useProjectStore } from '@/store/ProjectStore';
import TaskTypeRadioGroup from './tasktyperadiogroup';
import Image from 'next/image';
import { PencilIcon } from '@heroicons/react/24/solid';


export default function SettingsModal() {

  const [settingsIsOpen, closeSettingsModal] = useModalStore((state) => [
    state.settingsIsOpen,
    state.closeSettingsModal,
  ]);

  const [project, updateProjectInDB, setProjectState, projectNameInput, setProjectNameInput] = useProjectStore((state) => [
    state.project,
    state.updateProjectInDB,
    state.setProjectState,
    state.projectNameInput,
    state.setProjectNameInput,
  ]);

  const handleSubmit = (e => {
    e.preventDefault();
    // send projectNameInput to db
    updateProjectInDB(project.$id, projectNameInput);
    // set return object as project
    closeSettingsModal();
  });

  const handleClose = () => {
    closeSettingsModal();
    setProjectNameInput(project.name);
  }

  return (
    <Transition appear show={settingsIsOpen} as={Fragment}>
      <Dialog as="form" className="relative z-10" onClose={handleClose} onSubmit={handleSubmit}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>


        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden
              rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className='text-lg font-medium leading-6 text-gray-900 pb-2'>
                  Project Settings
                </Dialog.Title>
                <div className='mt-2'>
                  Project Name:
                  <input value={projectNameInput} onChange={e => setProjectNameInput(e.target.value)} className='w-full border border-gray-300 rounded-md outline-none p-3 mt-2' />
                </div>
                <div className='flex items-center space-x-2'>
                  {/* Render statuses using map */}
                  <p className=''>In Progress</p>
                  <PencilIcon className='w-4 h-4 inline' />
                </div>
                <div className='mt-4 flex justify-end'>
                  <button
                    type="submit"
                    /* disabled={!newProjectName} */
                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-100
                    px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100
                    disabled:text-gray-300 disabled:cursor-not-allowed'>
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
