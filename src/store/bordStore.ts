import { create } from 'zustand'
import {getTodosGroupByColumn} from '@/lib/getTodosGroupByColumn'
interface BoardState{
    board:Board,
    getBoard:()=>void;
}
export const useBordStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    }
         
    ,
    getBoard: async ()=>{
        const board = await getTodosGroupByColumn();
        set({board})
    }
  
}))