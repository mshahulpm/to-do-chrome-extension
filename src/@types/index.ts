
export interface Bucket {
    id: string;
    name: string;
    description?: string;
    noOfItems: number;
    todoLists: TodoItem[]
}


export interface TodoItem {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    completed: boolean
}