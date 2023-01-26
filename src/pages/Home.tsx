import { Box, Input, Heading, Center } from '@chakra-ui/react'
import GroupedTodoCard from 'src/components/Cards'



export default function Home() {

    return (
        <Center
            sx={{
                minHeight: '80vh',
                // display: 'flex',
                flexWrap: 'wrap',
                pb: 20,
                alignItems: 'flex-start'
            }}
        >
            <GroupedTodoCard no={2} />
            <GroupedTodoCard no={3} />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard no={3} />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
        </Center>
    )
};
