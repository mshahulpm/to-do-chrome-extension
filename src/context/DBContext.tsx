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

    const [todoTable, setTodoTable] = useLocalStorage<TodoItem[]>('todo-table', [])
    const [groupTodoTable, setGroupTodoTable] = useLocalStorage<GroupedTodoType[]>('group-todo-table', [])


    function AllTodoFromBucket(bucket_id: string) {
        const ungrouped_todo = todoTable.filter(todo => todo.bucket_id === bucket_id)
        const grouped_todo = groupTodoTable.filter(todo => todo.bucket_id === bucket_id)
        return {
            grouped_todo,
            ungrouped_todo
        }
    }

    function addUngroupedTodo(todo: TodoItem) {
        setTodoTable(prev => ([...prev, todo]))
    }

    function removeUnGroupedTodo(todo_id: string) {
        setTodoTable(prev => {
            return prev.filter(todo => todo.id !== todo_id)
        })
    }



    return (
        <DBContext.Provider value={{}}>
            {children}
        </DBContext.Provider>
    )
}