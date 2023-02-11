import { createContext, useContext, ReactNode } from 'react'
import { Bucket, GroupedTodoType, TodoItem } from 'src/@types'
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
    addGroupTodo: (bucketId: string, todo: GroupedTodoType) => any
    removeGroupTodo: (bucketId: string, groupId: string) => any
    selectedBucket: Bucket

}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
    children?: ReactNode
}

interface AppStateType {
    buckets: Bucket[]
    openedModal?: null | modalType
    selectedBucketId: string
}

export function AppProvider({ children }: AppProviderProps) {

    const [appState, setState] = useLocalStorage<AppStateType>('my-todo', {
        buckets: INITIAL_VALUES.buckets,
        selectedBucketId: INITIAL_VALUES.buckets[0].id
    })

    /**
     *   Selected Bucket 
     */
    const selectedBucket = appState.buckets.find(buck => buck.id === appState.selectedBucketId)!

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
        if (id === '123') return
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.filter(bucket => bucket.id != id),
            selectedBucketId: prev.buckets[0].id
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

    function addGroupTodo(bucketId: string, todo: GroupedTodoType) {
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.map(buck => {
                if (buck.id === bucketId) {
                    buck.groupedTodoLists.push(todo)
                }
                return buck
            })
        }))
    }

    function removeGroupTodo(bucketId: string, groupId: string) {
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.map(buck => {
                if (buck.id === bucketId) {
                    return {
                        ...buck,
                        groupedTodoLists: buck.groupedTodoLists.filter(gp_list => gp_list.id !== groupId)
                    }
                }
                return buck
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
                                if (it.id === todo.id) {
                                    return todo
                                }
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
            selectedBucketId: prev.buckets.find(buck => buck.id === id)?.id!
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
                selectBucket,
                addGroupTodo,
                removeGroupTodo,
                selectedBucket
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