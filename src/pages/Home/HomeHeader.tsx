import { Box, Input, Heading, Text, Button, IconButton, Flex, Tooltip } from '@chakra-ui/react'
import { useState } from "react"
import { useApp } from "src/context/AppContext"
import AddTodo from 'src/components/AddTodo'
import { DeleteIcon } from '@chakra-ui/icons'




export default function HomeHeader() {

    const { selectedBucket, removeBucket } = useApp()
    const [todoModal, setTodoModal] = useState(false)
    const noOfItems = selectedBucket.todoLists.length + selectedBucket.groupedTodoLists.length

    return (
        <>
            {todoModal && <AddTodo onClose={() => setTodoModal(false)} />}

            <Box sx={{ p: 3, px: 10, display: 'flex', justifyContent: 'space-between' }}>
                <Flex>
                    <Text fontWeight={700} fontSize={'2xl'}>
                        {selectedBucket.name} {' '} ({noOfItems})
                    </Text>
                    {
                        selectedBucket.id !== '123' &&
                        <IconButton
                            onClick={() => removeBucket(selectedBucket.id)}
                            sx={{ ml: 4, borderRadius: '50%' }} aria-label='button'>
                            <Tooltip label='Delete Bucket' colorScheme={'red'}>
                                <DeleteIcon color={'tomato'} />
                            </Tooltip>
                        </IconButton>
                    }
                </Flex>
                <Button
                    onClick={() => setTodoModal(true)}
                    size={'sm'} variant={'outline'} colorScheme='red'>+ Add Todo</Button>
            </Box>
        </>
    )
}