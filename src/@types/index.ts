
export interface Bucket {
    id: string;
    name: string;
    description?: string;
    noOfItems: number;
    todoLists: TodoItem[]
    groupedTodoLists: GroupedTodoType[]
}


export interface TodoItem {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    completed: boolean
}

export interface GroupedTodoType {
    id: string
    heading: string
    items: TodoItem[]
}