import { Box, Center, Text, useColorModeValue } from '@chakra-ui/react'
import GroupedTodoCard, { SingleTodo } from 'src/components/Cards'
import NewBucket from 'src/components/NewBucket'
import ConfirmBox from 'src/components/UI/ConfirmBox'
import { useApp } from 'src/context/AppContext'
import HomeHeader from './HomeHeader'



export default function Home() {

    const { groupedTodoLists, todoLists } = useApp().selectedBucket
    const rev_groupedTodoLists = [...groupedTodoLists].reverse()
    const rev_todoLists = [...todoLists].reverse()

    const isTodosEmpty = !(rev_groupedTodoLists.length || rev_todoLists.length)

    return (
        <>
            <NewBucket />

            <Center
                sx={{
                    minHeight: '90vh',
                    // display: 'flex',
                    flexWrap: 'wrap',
                    pt: 10,
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

                {
                    isTodosEmpty &&
                    <Box
                        bg={useColorModeValue('grey.50', 'grey.900')}
                        sx={{ p: 10, mt: 20 }}
                        boxShadow={'md'}
                        rounded='md'
                    >
                        <Text color={'gray'}> Add some tasks ...</Text>
                    </Box>
                }

            </Center>
        </>
    )
};
