import { Box, Input, Heading, Center, Text, Button } from '@chakra-ui/react'
import AddTodo from 'src/components/AddTodo'
import GroupedTodoCard, { SingleTodo } from 'src/components/Cards'
import NewBucket from 'src/components/NewBucket'
import { useApp } from 'src/context/AppContext'



export default function Home() {

    const { selectedBucket } = useApp()

    return (
        <>
            <NewBucket />
            <AddTodo />
            <Box sx={{ p: 3, px: 10, display: 'flex', justifyContent: 'space-between' }}>
                <Text fontWeight={700} fontSize={'xl'}>
                    {selectedBucket.name} {' '} ({selectedBucket.noOfItems})
                </Text>
                <Button size={'sm'} variant={'outline'} colorScheme='red'>+ Add Todo</Button>
            </Box>
            <Center
                sx={{
                    minHeight: '80vh',
                    // display: 'flex',
                    flexWrap: 'wrap',
                    pb: { base: 40, md: 20 },
                    alignItems: 'flex-start'
                }}
            >
                <GroupedTodoCard no={2} />
                <GroupedTodoCard no={3} />
                <GroupedTodoCard />
                <GroupedTodoCard />
                <GroupedTodoCard no={3} />
                <GroupedTodoCard />
                <GroupedTodoCard />
                <SingleTodo />
                <SingleTodo />
            </Center>
        </>
    )
};
