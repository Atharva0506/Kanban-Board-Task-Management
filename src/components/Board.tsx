"use client";
import { useBordStore } from "@/store/boardStore";
import { useEffect } from "react";
import Column from "@/components/Column"; // Corrected import name
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

function Board() {
  const [board, getBoard,setBoardState,updateTodoInDb] = useBordStore((state) => [state.board, state.getBoard,
  state.setBoardState,
  state.updateTodoInDb

  ]);
  console.log("Board",board);
  useEffect(() => {
    // Get Board
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const {destination,source,type} = result;
    // console.log(destination,"Source: ",source,"Type: ",type)
    // Handling Columns For Rearrange Columns  
    if(!destination) return;
    //Column drag
    if(type ==="column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index,1);
      entries.splice(destination.index,0,removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({...board,columns:rearrangedColumns})
    }

    const columns = Array.from(board.columns);
    const startColIndex= columns[Number(source.droppableId)];
    const finshedColIndex= columns[Number(destination.droppableId)];

    const startCol:Column ={
      id: startColIndex && startColIndex[0],
      todos:startColIndex && startColIndex[1] && startColIndex[1].todos
    }
    const finshCol:Column ={
      id:finshedColIndex && finshedColIndex[0],
      todos:finshedColIndex && finshedColIndex[1] &&finshedColIndex[1].todos
    }
    if(!startCol || !finshCol) return;
    if(source.index === destination.index && startCol === finshCol) return;

    const newTodos = startCol.todos;

    if (Array.isArray(newTodos)) {
      const [todoMoved] = newTodos.splice(source.index, 1);
      
    

    if(startCol.id === finshCol.id){
      
      //Same Colum Drag
      newTodos.splice(destination.index,0,todoMoved);
      const newCol={
        id:startCol.id,
        todos:newTodos
      }
      const newColums = new Map(board.columns);
      newColums.set(startCol.id,newCol);
      setBoardState({...board,columns:newColums});
    }else{
      //Dragging To another Column
      const finshTodos= Array.from(finshCol.todos);
      finshTodos.splice(destination.index,0,todoMoved)
      const newColums = new Map(board.columns);
      const newCol={
        id:startCol.id,
        todos:newTodos
      }
      newColums.set(startCol.id,newCol);
      newColums.set(finshCol.id,{
        id:finshCol.id,
        todos:finshTodos
      });
      //Update In DB
        updateTodoInDb(todoMoved,finshCol.id)
      setBoardState({...board,columns:newColums});
    }
  }
  };

  return (
    
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl  mx-auto"
            >
              {Array.from(board.columns.entries()).map(([id, column], index) => (
                <Column
                  key={id}
                  id={id}
                  todos={column.todos} 
                  index={index}
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  
  );
}

export default Board;
