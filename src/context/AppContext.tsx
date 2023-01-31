import { createContext, useContext, ReactNode } from 'react'
import { Bucket, TodoItem } from 'src/@types'
import { INITIAL_VALUES } from 'src/constants'
import { useLocalStorage } from 'src/hooks/useLocalStorage'


type modalType = 'bucket' | 'todo'
export interface AppContextType extends AppStateType {
    addNewBucket: (name: string, description?: string) => any;
    removeBucket: (id: string) => any;
    addTodo: (bucketId: string, todo: TodoItem, groupId?: string) => any;
    updateTodo: (bucketId: string, todo: TodoItem, groupId?: string) => any;
    removeTodo: (bucketId: string, todoId: string, groupId?: string) => any;
    openModel: (type: modalType) => any
    closeModal: () => any
    selectBucket: (id: string) => any
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
    children?: ReactNode
}

interface AppStateType {
    buckets: Bucket[]
    openedModal?: null | modalType
    selectedBucket: Bucket
}

export function AppProvider({ children }: AppProviderProps) {

    const [appState, setState] = useLocalStorage<AppStateType>('my-todo', {
        buckets: INITIAL_VALUES.buckets,
        selectedBucket: INITIAL_VALUES.buckets[0]
    })

    function addNewBucket(name: string, description?: string) {
        setState(prev => ({
            ...prev,
            buckets: [
                ...prev.buckets,
                { id: Date.now() + '', name, description, noOfItems: 0, todoLists: [], groupedTodoLists: [] }
            ]
        }))
    }

    function removeBucket(id: string) {
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.filter(bucket => bucket.id != id)
        }))
    }

    function addTodo(bucketId: string, todo: TodoItem, groupId?: string) {
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.map(bucket => {
                if (bucket.id === bucketId) {
                    if (groupId) {
                        bucket.groupedTodoLists = bucket.groupedTodoLists.map(gp_list => {
                            if (gp_list.id === groupId) {
                                gp_list.items.push(todo)
                                return gp_list
                            }
                            return gp_list
                        })
                        return bucket
                    }
                    bucket.todoLists.push(todo)
                    return bucket
                }
                return bucket
            })
        }))
    }

    function removeTodo(bucketId: string, todoId: string, groupId?: string) {
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.map(bucket => {
                if (bucket.id === bucketId) {
                    if (groupId) {
                        bucket.groupedTodoLists = bucket.groupedTodoLists.map(gp_list => {
                            if (gp_list.id === groupId) {
                                gp_list.items = gp_list.items.filter(it => it.id !== todoId)
                                return gp_list
                            }
                            return gp_list
                        })
                        return bucket
                    }
                    return {
                        ...bucket,
                        todoLists: bucket.todoLists.filter(item => item.id !== todoId)
                    }
                }
                return bucket
            })
        }))
    }

    function updateTodo(bucketId: string, todo: TodoItem, groupId?: string) {
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.map(bucket => {
                if (bucket.id === bucketId) {

                    if (groupId) {
                        bucket.groupedTodoLists = bucket.groupedTodoLists.map(gp_list => {
                            gp_list.items = gp_list.items.map(it => {
                                if (it.id === todo.id) return todo
                                return it
                            })
                            return gp_list
                        })
                        return bucket
                    }

                    return {
                        ...bucket,
                        todoLists: bucket.todoLists.map(item => {
                            if (item.id === todo.id) {
                                return todo
                            }
                            return item
                        })
                    }
                }
                return bucket
            })
        }))
    }

    function openModel(modal: modalType) {

        setState(prev => ({
            ...prev,
            openedModal: modal
        }))

    }

    function closeModal() {
        setState(prev => ({
            ...prev,
            openedModal: null
        }))
    }

    function selectBucket(id: string) {
        setState((prev => ({
            ...prev,
            selectedBucket: prev.buckets.find(buck => buck.id === id)!
        })))
    }

    return (
        <AppContext.Provider
            value={{
                ...appState,
                addNewBucket,
                removeBucket,
                addTodo,
                updateTodo,
                removeTodo,
                openModel,
                closeModal,
                selectBucket
            }}
        >
            {children}
        </AppContext.Provider>
    )
}



export function useApp() {

    const context = useContext(AppContext)

    if (!context) throw new Error('useApp only can used inside AppProvider')

    return context
}