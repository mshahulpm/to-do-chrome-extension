import { Box, Input, Heading, Center } from '@chakra-ui/react'
import GroupedTodoCard, { SingleTodo } from 'src/components/Cards'
import NewBucket from 'src/components/NewBucket'



export default function Home() {

    return (
        <>
            <NewBucket />
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
