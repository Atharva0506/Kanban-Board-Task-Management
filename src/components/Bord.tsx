"use client";
import { useBordStore } from "@/store/bordStore";
import React, { useEffect } from "react";
import Column from "@/components/Colummn";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
function Board() {
  const [board, getBorad] = useBordStore((state) => [
    state.board,
    state.getBoard,
  ]);
  useEffect(() => {
    //Get Bord
    getBorad();
  }, [getBorad]);

  const handleOnDragEnd = (result: DropResult) => {};
  return (
    <section>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provoided) => (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
              {...provoided.droppableProps}
              ref={provoided.innerRef}
            >
              {Array.from(board.columns.entries()).map(
                ([id, colummn], index) => (
                  <Column
                    key={id}
                    id={id}
                    index={index}
                    todos={colummn.todos}
                  />
                )
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}

export default Board;
