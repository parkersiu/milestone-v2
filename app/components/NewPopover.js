import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { useProjectStore } from '@/store/ProjectStore'

export default function NewPopover() {

  const [editedStatusArray, setEditedStatusArray, newStatus, setNewStatus, updateProjectInDB, project, projectNameInput] = useProjectStore((state) => [
    state.editedStatusArray,
    state.setEditedStatusArray,
    state.newStatus,
    state.setNewStatus,
    state.updateProjectInDB,
    state.project,
  ]);

  const handleSubmit = (e => {
    e.preventDefault();
    setEditedStatusArray([...editedStatusArray, newStatus]);
    updateProjectInDB(project.$id, project.name, editedStatusArray);
  });

  return (
    <div className="top-16 w-full max-w-sm">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-white/20 px-3 py-2 text-base hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className='italic'>New Column</span>
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-black transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-sm">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <form className="bg-gray-50 p-4" onSubmit={handleSubmit}>
                    <input className='w-full p-2 mb-1' placeholder='New status name...' value={newStatus}
                    onChange={e => setNewStatus(e.target.value)}
                    />
                    <button
                      type="submit"
                      disabled={!newStatus}
                      className='w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100
                      px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none
                      focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100
                      disabled:text-gray-300 disabled:cursor-not-allowed'>
                      Save
                    </button>
                  </form>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
