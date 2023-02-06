
export interface Bucket {
    id: string;
    name: string;
    description?: string;
    noOfItems: number;
    todoLists: TodoItem[]
    groupedTodoLists: GroupedTodoType[]
}


export interface TodoItem {
    bucket_id?: string
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    completed: boolean
}

export interface GroupedTodoType {
    bucket_id: string
    id: string
    heading: string
    items: TodoItem[]
}