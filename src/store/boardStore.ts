import { db, storage, ID } from '@/appwrite';
import { create } from 'zustand'
import uploadImage from "@/lib/uploadImage"
import { getTodosGroupByColumn } from '@/lib/getTodosGroupByColumn'
interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDb: (todo: Todo, columnId: TypedColumn) => void;
    newTaskInput: string;
    newDesc: string;
    searchString: string;
    image: File | null
    setSearchString: (searchString: string) => void;
    setNewTaskInput: (input: string) => void;
    setNewDesc: (input: string) => void;
    newTaskType: TypedColumn;
    setNewTaskType: (columnId: TypedColumn) => void;
    addTask: (todo: string, description: string, columnId: TypedColumn, image?: File | null) => void;
    setImage: (image: File | null) => void;
    deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void;
    updateTask: (newTaskInput: string, newDesc: string, newStatus: TypedColumn, updatedTask: Todo, image?: File | null) => void;
}
export const useBordStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    searchString: "",
    newTaskInput: "",
    newTaskType: "todo",
    image: null,
    newDesc: "",
    setNewTaskInput: (newTaskInput) => set({ newTaskInput }),
    setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),
    setNewDesc: (newDesc) => set({ newDesc }),
    setSearchString: (searchString) => set({ searchString }),
    getBoard: async () => {
        const board = await getTodosGroupByColumn();
        set({ board })
    },
    setImage: (image: File | null) => set({ image }),
    setBoardState: (board) => set({ board }),

    updateTodoInDb: async (todo, columnId) => {
        await db.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id, {
            title: todo.title,
            status: columnId,
            description: todo.description
        }
        )
    },
    deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
        const newColumns = new Map(get().board.columns);
        newColumns.get(id)?.todos.splice(taskIndex, 1);
        set({ board: { columns: newColumns } })
        if (todo.image) {
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
        }
        await db.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id)
    },
    addTask: async (todo: string, description: string, columnId: TypedColumn, image?: File | null) => {
        let file: Image | undefined;
        if (image) {
            const fileUpload = await uploadImage(image);
            if (fileUpload) {
                file = {
                    bucketId: fileUpload.bucketId,
                    fileId: fileUpload.$id
                }
            }
        }

        const { $id } = await db.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                description: description,
                //IF image
                ...(file && { image: JSON.stringify(file) })
            })
        set({ newTaskInput: "" })
        set({ newDesc: "" })
        set((state) => {
            const newColumns = new Map(get().board.columns);
            const newTodo: Todo = {
                $id,
                $createdAT: new Date().toString(),
                title: todo,
                description: description,
                status: columnId,
                ...(file && { image: file })
            }
            const column = newColumns.get(columnId)
            if (!column) {
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo]
                })
            }
            else {
                newColumns.get(columnId)?.todos.push(newTodo)
            }
            return {
                board: {
                    columns: newColumns
                }
            }
        })
    },

    updateTask: async (
        newTaskInput: string,
        newDesc: string,
        newStatus: TypedColumn,
        updatedTask: Todo,
        newImage?: File | null
      ) => {
        let file: Image | undefined;
        if (newImage) {
          const fileUpload = await uploadImage(newImage);
          if (fileUpload) {
            file = {
              bucketId: fileUpload.bucketId,
              fileId: fileUpload.$id,
            };
          }
        }
      
        const { board, setBoardState } = get();
      
        // Find the column containing the task
        const columnId = updatedTask.status;
        const column = board.columns.get(columnId);
      
        if (!column) {
          console.error(`Column with id ${columnId} not found`);
          return;
        }
      
        // Update the task in the database
        const { $id } = await db.updateDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
          updatedTask.$id,
          {
            title: newTaskInput,
            status: newStatus,
            description: newDesc,
            // If newImage exists, update the image field
            ...(file && { image: JSON.stringify(file) }),
          }
        );
      
        // Update the state
        set((state) => {
          const updatedColumns = new Map(board.columns);
          const updatedColumn = updatedColumns.get(newStatus);
      
          if (!updatedColumn) {
            console.error(`Column with id ${newStatus} not found`);
            return state;
          }
      
          const updatedTodos = updatedColumn.todos.map((todo) =>
            todo.$id === $id
              ? {
                  ...todo,
                  title: newTaskInput,
                  description: newDesc,
                  status: newStatus,
                  ...(file && { image: file }),
                }
              : todo
          );
      
          updatedColumns.set(newStatus, {
            ...updatedColumn,
            todos: updatedTodos,
          });
      
          return {
            board: {
              columns: updatedColumns,
            },
          };
        });
      },





}))