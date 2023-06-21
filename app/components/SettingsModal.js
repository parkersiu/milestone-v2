'use client';

import { useState, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore';
import TaskTypeRadioGroup from './tasktyperadiogroup';
import Image from 'next/image';
import { PhotoIcon, PencilIcon } from '@heroicons/react/24/solid';


export default function SettingsModal() {

  const [settingsIsOpen, closeSettingsModal] = useModalStore((state) => [
    state.settingsIsOpen,
    state.closeSettingsModal,
  ]);

  const handleSubmit = (e => {
    e.preventDefault();
    closeModal();
  })

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={settingsIsOpen} as={Fragment}>
      <Dialog as="form" className="relative z-10" onClose={closeSettingsModal} onSubmit={handleSubmit}>
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
                  <input value="Project Name" className='w-full border border-gray-300 rounded-md outline-none p-5' />
                </div>
                <div className='flex items-center space-x-2'>
                  <p className=''>In Progress</p>
                  <PencilIcon className='w-4 h-4 inline' />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
