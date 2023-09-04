import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TodoCard from '@/components/TodoCard';
type Props = {
  id: TypedColumn,
  todos: Todo[],
  index: number,
}

const toDoColumnText :{[key in TypedColumn]: string;} = 
{
  "todo":"Todos",
  "inprogress":"In Progress",
  "done":"Done",
}

function Column({ id, todos, index }: Props) {
  
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onDragStart={() => alert('onDragStart')}
          onDragEnd={() => alert('onDragEnd')}
        >
 <Droppable droppableId={index.toString()} type='card'>
  {(provided, snapshot) => (
     
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
     
      className={`p-2 rounded-2xl shadow-sm  ${
        snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
      }`}
    >
      
      <h2 className='flex justify-between font-bold text-xl'>{toDoColumnText[id]}
      <span className='text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal'>{todos.length}</span>
      </h2>
      <div className='space-y-2'>
          {todos.map((todo,index) =>(
            <Draggable
            key={todo.$id}
            index={index}
            draggableId={todo.$id}
            >
              {(provided)=>(
                  <TodoCard
                  todo={todo}
                  index={index}
                  id={id}
                  innerRef={provided.innerRef}
                  draggabelProps={provided.draggableProps}
                  dragHandleProps={provided.dragHandleProps}
                  />
          )
              }

            </Draggable>
          ))}
          {provided.placeholder}
          <div className='flex justify-end items-end py-2'><button className='text-gray-500 hover:text-gray-600'>
            <PlusCircleIcon className='h-10 w-10'/>
            </button></div>
      </div>
    </div>
  )}
</Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
