import { createContext } from "react";
import { GroupedTodoType, TodoItem } from "src/@types";
import { useLocalStorage } from "src/hooks/useLocalStorage";



interface DBContextType {

}

const DBContext = createContext<DBContextType | undefined>(undefined)


type props = {
    children: React.ReactNode
}
export function DBProvider({ children }: props) {

    const [todoTable, setTodo] = useLocalStorage<TodoItem[]>('todo-table', [])
    const [groupTodoTable, setGroupTodoTable] = useLocalStorage<GroupedTodoType[]>('group-todo-table', [])


    function AllTodoFromBucket(bucket_id: string) {
        const ungrouped_todo = todoTable.filter(todo => todo.bucket_id === bucket_id)
        const grouped_todo = groupTodoTable.filter(todo => todo.bucket_id === bucket_id)
        return {
            groupTodoTable,
            ungrouped_todo
        }
    }


    return (
        <DBContext.Provider value={{}}>
            {children}
        </DBContext.Provider>
    )
}