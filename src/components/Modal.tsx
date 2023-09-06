"use client"
import { useState, Fragment, useRef, FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/modalStore'
import { useBordStore } from '@/store/boardStore'
import TaskTypeRadioGroup from '@/components/TaskTypeRadioGroup'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/24/outline'
function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [addTask,image,setImage,newTaskInput,setNewTaskInput,newDesc,setNewDesc,newTaskType] = useBordStore((state)=>[
    state.addTask,
    state.image,state.setImage,
    state.newTaskInput, state.setNewTaskInput,
    state.newDesc, state.setNewDesc,
    state.newTaskType,
  ])
  const [isOpen,closeModal] = useModalStore((state)=>[
    state.isOpen,
    state.closeModal
  ])
  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!newTaskInput) return;

    //Add Task
    addTask(newTaskInput,newDesc,newTaskType,image)
    setImage(null);
    closeModal();
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="form"
    onSubmit={ handleSubmit}
    className="relative z-10" onClose={closeModal}>
      {/* ... */}
      <div className="fixed inset-0 flex items-center justify-center">
        {/* Background with blur */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md" style={{ zIndex: -1 }} />
        
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
              Add A Task
            </Dialog.Title>
            <div className="mt-2">
                <input
                type="text"
                value={newTaskInput}
                onChange={(e) =>setNewTaskInput(e.target.value)}
                placeholder="Enter a task here..."
                className="w-full border border-gray-300 rounded-md outline-none p-5"/>
                </div>
                <div className="mt-2">
                <input
                type="text"
                value={newDesc}
                onChange={(e) =>setNewDesc(e.target.value)}
                placeholder="Enter Description"
                className="w-full border border-gray-300 rounded-md outline-none p-5"/>
                </div>
           {/* Task Type Radio Group */}
           <TaskTypeRadioGroup/>
           <div className='mt-2'>
            <button
            type='button'
            onClick={()=>{
              imagePickerRef.current?.click()
            }}
            className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 '>
              <PhotoIcon className='h-5 w-6 mr-2 inline-block' />
              Upload Image 
            </button>
            {image && (
              <Image
              alt='Uploade Image'
              width={200}
              height={200}
              className='w-full object-cover h-44 mt-2 filter hover:grayscale translate-all decoration-150 cursor-not-allowed '
              src={URL.createObjectURL(image)}
              onClick={()=>{
                setImage(null)
              }}

              />
            )}
            <input type="file"
            ref={imagePickerRef}
            hidden
            onChange={(e)=>{
              if (!e.target.files![0].type.startsWith("image/")) return;
              setImage(e.target.files![0])
            }}
            />
           </div>
           <div className='mt-4'>
            <button
            disabled={!newTaskInput}
            type='submit'
            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed'>
              Add Task
            </button>
           </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
  )
}
export default Modal