import { Box, Input, Heading } from '@chakra-ui/react'
import GroupedTodoCard from 'src/components/Cards'



export default function Home() {

    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >

            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
            <GroupedTodoCard />
        </Box>
    )
};
