import { Box, Center } from '@chakra-ui/react'
import GroupedTodoCard, { SingleTodo } from 'src/components/Cards'
import NewBucket from 'src/components/NewBucket'
import { useApp } from 'src/context/AppContext'
import HomeHeader from './HomeHeader'



export default function Home() {

    const { groupedTodoLists, todoLists } = useApp().selectedBucket
    const rev_groupedTodoLists = [...groupedTodoLists].reverse()
    const rev_todoLists = [...todoLists].reverse()

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
                    rev_groupedTodoLists.map((tList, i) => (
                        <GroupedTodoCard todoItem={tList} key={tList.id} />
                    ))
                }

                {
                    rev_todoLists.map((lst, i) => (
                        <Box key={lst.id} sx={{ m: 2 }}>
                            <SingleTodo item={lst} />
                        </Box>
                    ))
                }

            </Center>
        </>
    )
};
