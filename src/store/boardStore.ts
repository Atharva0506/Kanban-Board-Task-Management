import { db } from '@/appwrite';
import { create } from 'zustand'
import { getTodosGroupByColumn } from '@/lib/getTodosGroupByColumn'
import Board from '@/components/Board';
interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState:(board: Board) => void;
    updateTodoInDb:(todo: Todo,columnsId:TypedColumn) => void;
}
export const useBordStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard: async () => {
        const board = await getTodosGroupByColumn();
        set({ board })
    },
    setBoardState:(board)=>set({ board }),

    updateTodoInDb:async (todo,columnsId)=>{
            await db.updateDocument( 
                process.env.NEXT_PUBLIC_DATABASE_ID!,
                process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
                todo.$id,{
                    title:todo.title,
                    status:todo.status
                }
                )
    }
}))