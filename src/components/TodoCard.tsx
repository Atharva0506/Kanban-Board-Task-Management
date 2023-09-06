"use client";
import { useBordStore } from '@/store/boardStore';
import { PencilIcon,  XCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react'
import getUrl from "@/lib/getUrl"
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
import Image from 'next/image';
type NewType = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggabelProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps| null | undefined;
};

type Props =NewType
function TodoCard({todo,index,id,innerRef,draggabelProps,dragHandleProps}:Props) {
  
  const deleteTask = useBordStore((state)=>state.deleteTask)
  const [imageUrl,setImageUrl] = useState<string | null>(null);
  useEffect(()=>{
    if(todo.image){
      const fatchImage = async ()=>{
        const url = await getUrl(todo.image!);
        if(url){
          setImageUrl(url.toString());
        }
      }
      fatchImage()
    }
  },[todo]) 
  return (
<div
  className='bg-white rounded-md space-y-2 drop-shadow-md relative'
  {...dragHandleProps}{...draggabelProps}ref={innerRef}
>
  <div className='p-5'>
    <div className='flex justify-between items-center'>
      <div>
        <p className="flex font-bold items-center">{todo.title}</p>
        <p className=''>{todo.description}</p>
      </div>
    </div>
    <div className="absolute top-0 right-0  mr-2">
      <button className="hover:text-green-500 text-green-600">
        <PencilIcon className="h-6 w-8" />
      </button>
      <button onClick={() => deleteTask(index, todo, id)} className='text-red-500 hover:text-red-600 '>
        <XCircleIcon className='h-8 w-8' />
      </button>
    </div>
  </div>
  {imageUrl && (
    <div className='h-full w-full rounded-b-md'>
      <Image
        src={imageUrl}
        alt='Task Image'
        width={400}
        height={200}
        className='w-full object-contain rounded-b-md'
      />
    </div>
  )}
</div>
  )
}

export default TodoCard