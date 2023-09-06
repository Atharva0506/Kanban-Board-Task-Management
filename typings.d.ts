interface Board {
    columns: Map<TypedColumn, Column>;
}                I
type TypedColumn = "todo"|"inprogress"|"done";

interface Column{
    id:TypedColumn;
    todos:Todo[];
}
interface Todo {
    $id:string,
    $createdAT:string,
    title:string,
    description:string,
    status:TypedColumn,
    image?:Image
}
interface Image{
    bucketId:string,
    fileId:string
}

