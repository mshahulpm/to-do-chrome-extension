import {
    Box,
    Center,
    Text,
    Stack,
    useColorModeValue,
    Card,
    Checkbox,
    chakra,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from './CustomButtons';
import { AiFillDelete } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import { GroupedTodoType, TodoItem } from 'src/@types';
import { useApp } from 'src/context/AppContext';

type GroupTodoProps = {
    todoItem: GroupedTodoType
}
export default function GroupedTodoCard({ todoItem }: GroupTodoProps) {

    const { removeGroupTodo, selectedBucket } = useApp()

    return (
        <Box m={2} sx={{ display: 'inline-block', maxW: 220, float: 'left' }}>
            <Box
                maxW={'330px'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>

                <Stack direction={'row'} sx={{ p: 2 }} >
                    <Text
                        fontSize={'sm'}
                        fontWeight={500}
                        bg={useColorModeValue('grey.50', 'grey.900')}
                        p={2}
                        px={3}
                        color={'grey.500'}
                        mr={'auto'}
                        rounded={'base'}>
                        {todoItem.heading}
                    </Text>
                    <IconButton label='Delete' >
                        <AiFillDelete
                            onClick={() => removeGroupTodo(selectedBucket.id, todoItem.id)}
                            style={{ color: 'tomato' }} />
                    </IconButton>
                </Stack>

                <Box bg={useColorModeValue('gray.50', 'gray.900')} p={3} >
                    {
                        todoItem.items.map(item => (
                            <SingleTodo key={item.id} item={item} />
                        ))
                    }
                </Box>
            </Box>
        </Box>
    );
}

const CustomText = chakra(Text, {
    baseStyle: {
        py: 0,
        my: 0
    }
})


type SingleTodoProps = {
    item: TodoItem,
    group_id?: string
}
export function SingleTodo({ item, group_id }: SingleTodoProps) {

    const { removeTodo, selectedBucket } = useApp()


    return (
        <Card sx={{ my: 1 }}>
            <Box sx={{ display: 'flex', maxW: 200 }}>
                <Box sx={{ py: 2, pl: 4, minWidth: 150 }}>
                    <CustomText fontWeight={700} fontSize={'xs'}>{item.title}</CustomText>
                    <CustomText fontSize={'xs'}>
                        {item.description}
                    </CustomText>
                    <CustomText sx={{
                        border: '1px solid lightgray',
                        display: 'inline-block',
                        px: 2,
                        borderRadius: 4

                    }} fontSize={'xs'}>
                        {new Date(item.dueDate!).toLocaleDateString()}
                    </CustomText>
                </Box>
                <Stack sx={{ p: 2 }}>
                    <Checkbox />
                    <DeleteIcon onClick={() => removeTodo(selectedBucket.id, item.id, group_id)} />
                    <MdEdit />
                </Stack>
            </Box>

        </Card >
    )
}