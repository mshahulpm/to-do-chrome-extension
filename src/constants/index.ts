import { Bucket } from "src/@types";

type InitialValueType = {
    buckets: Bucket[]
}

export const INITIAL_VALUES: InitialValueType = {
    buckets: [{
        id: "123",
        name: 'Home',
        description: 'Some random todo items...',
        noOfItems: 0,
        todoLists: [],
        groupedTodoLists: []
    }]
}