import { createContext, useContext, ReactNode } from 'react'
import { Bucket, TodoItem } from 'src/@types'
import { INITIAL_VALUES } from 'src/constants'
import { useLocalStorage } from 'src/hooks/useLocalStorage'


type modalType = 'bucket' | 'todo'
export interface AppContextType extends AppStateType {
    addNewBucket: (name: string, description?: string) => any;
    removeBucket: (id: string) => any;
    addTodo: (bucketId: string, todo: TodoItem) => any;
    updateTodo: (bucketId: string, todo: TodoItem) => any;
    removeTodo: (bucketId: string, todoId: string) => any;
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
    selectedBucket: string
}

export function AppProvider({ children }: AppProviderProps) {

    const [appState, setState] = useLocalStorage<AppStateType>('my-todo', {
        buckets: INITIAL_VALUES.buckets,
        selectedBucket: INITIAL_VALUES.buckets[0].id
    })

    function addNewBucket(name: string, description?: string) {
        setState(prev => ({
            ...prev,
            buckets: [
                ...prev.buckets,
                { id: Date.now() + '', name, description, noOfItems: 0, todoLists: [] }
            ]
        }))
    }

    function removeBucket(id: string) {
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.filter(bucket => bucket.id != id)
        }))
    }

    function addTodo(bucketId: string, todo: TodoItem) {
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.map(bucket => {
                if (bucket.id === bucketId) {
                    bucket.todoLists.push(todo)
                    return bucket
                }
                return bucket
            })
        }))
    }

    function removeTodo(bucketId: string, todoId: string) {
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.map(bucket => {
                if (bucket.id === bucketId) {
                    return {
                        ...bucket,
                        todoLists: bucket.todoLists.filter(item => item.id !== todoId)
                    }
                }
                return bucket
            })
        }))
    }

    function updateTodo(bucketId: string, todo: TodoItem) {
        setState(prev => ({
            ...prev,
            buckets: prev.buckets.map(bucket => {
                if (bucket.id === bucketId) {
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
            selectedBucket: id
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