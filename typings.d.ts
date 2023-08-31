interface Board {
    columns: Map<TypedColumn, Column>;
}                I
type TypedColumn = "todo"|"inprogress"|"done";

interface Column{
    id:TypedColumn,
    todos:Todo[];
}
interface Todo extends Models.Document{
    $id:string,
    $createdAT:string,
    title:string,
    status:TypedColumn,
    image?:Image
}
interface Image{
    bucketId:string,
    fileId:string
}

