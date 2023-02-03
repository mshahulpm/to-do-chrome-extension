import { Center } from '@chakra-ui/react'
import GroupedTodoCard, { SingleTodo } from 'src/components/Cards'
import NewBucket from 'src/components/NewBucket'
import { useApp } from 'src/context/AppContext'
import HomeHeader from './HomeHeader'



export default function Home() {

    const { groupedTodoLists, todoLists } = useApp().selectedBucket

    return (
        <>
            <NewBucket />

            <HomeHeader />

            <Center
                sx={{
                    minHeight: '80vh',
                    // display: 'flex',
                    flexWrap: 'wrap',
                    pb: { base: 40, md: 20 },
                    alignItems: 'flex-start'
                }}
            >

                {
                    groupedTodoLists.map((tList, i) => (
                        <GroupedTodoCard todoItem={tList} key={i} />
                    ))
                }

                {
                    todoLists.map((lst, i) => (
                        <SingleTodo key={i} item={lst} />
                    ))
                }

            </Center>
        </>
    )
};
