import { db, storage ,ID} from '@/appwrite';
import { create } from 'zustand'
import uploadImage from "@/lib/uploadImage"
import { getTodosGroupByColumn } from '@/lib/getTodosGroupByColumn'

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState:(board: Board) => void;
    updateTodoInDb:(todo: Todo,columnId:TypedColumn) => void;
    newTaskInput:string;
    searchString: string;
    image : File | null
    setSearchString:(searchString: string) => void;
    setNewTaskInput:(input: string) => void;
    newTaskType:TypedColumn;
    setNewTaskType:(columnId: TypedColumn) => void;
    deleteTask:(taskIndex: number,todo:Todo,id:TypedColumn) => void;
    addTask:(todo:string, columnId: TypedColumn,image?:File | null) => void;
    setImage:(image: File | null)=> void;

}
export const useBordStore = create<BoardState>((set,get) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    searchString:"",
    newTaskInput:"",
    newTaskType:"todo",
    image: null,
    setNewTaskInput:(newTaskInput)=>set({newTaskInput}),
    setNewTaskType:(columnId:TypedColumn)=>set({newTaskType:columnId}),
    setSearchString:(searchString)=>set({searchString}),
    getBoard: async () => {
        const board = await getTodosGroupByColumn();
        set({ board })
    },
    setImage:(image: File | null)=> set({image}),
    setBoardState:(board)=>set({ board }),

    updateTodoInDb:async (todo,columnId)=>{
            await db.updateDocument( 
                process.env.NEXT_PUBLIC_DATABASE_ID!,
                process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
                todo.$id,{
                    title:todo.title,
                    status:columnId
                }
                )
    },
    deleteTask:async(taskIndex: number,todo:Todo,id:TypedColumn)=>{
        const newColumns = new Map(get().board.columns);
        newColumns.get(id)?.todos.splice(taskIndex,1);
        set({board:{columns:newColumns}})
        if(todo.image){
            await storage.deleteFile(todo.image.bucketId,todo.image.fileId)
        }
        await db.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id)
    },
    addTask:async (todo:string, columnId: TypedColumn,image?:File | null) => {
        let file: Image|undefined;
        if(image){
            const fileUpload = await uploadImage(image);
                if(fileUpload){
                    file= {
                        bucketId: fileUpload.bucketId,
                        fileId: fileUpload.$id
                    }
                }
        }

        const{$id} = await db.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title:todo,
                status:columnId,
                //IF image
                ...(file && {image: JSON.stringify(file)})
            })
            set({newTaskInput:""})
            set((state)=>{
                const newColumns = new Map(get().board.columns);
                const newTodo : Todo ={
                    $id,
                    $createdAT:new Date().toString(),
                    title:todo,
                    status:columnId,
                    ...(file&& {image:file})
                }
                const column = newColumns.get(columnId)
                if(!column){
                    newColumns.set(columnId,{
                        id:columnId,
                        todos:[newTodo]
                    })
                }
                else{
                    newColumns.get(columnId)?.todos.push(newTodo)
                }
                return {
                    board :{
                        columns:newColumns
                    }
                }
            })
        }


   

   

}))