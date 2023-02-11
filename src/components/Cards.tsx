import {
    Box,
    Center,
    Text,
    Stack,
    useColorModeValue,
    Card,
    Checkbox,
    chakra,
    Flex,
} from '@chakra-ui/react';
import { DeleteIcon, TimeIcon } from '@chakra-ui/icons';
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
        <Box m={2} sx={{ display: 'inline-block', w: 220, float: 'left' }}>
            <Box
                maxW={'330px'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'md'}
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
                    <span
                        onClick={() => removeGroupTodo(selectedBucket.id, todoItem.id)}
                    >
                        <IconButton label='Delete' >
                            <AiFillDelete
                                style={{ color: 'tomato' }} />
                        </IconButton>
                    </span>
                </Stack>

                <Box bg={useColorModeValue('gray.50', 'gray.900')} p={3} >
                    {
                        todoItem.items.map((item, i) => (
                            <SingleTodo key={i} item={item} group_id={todoItem.id} />
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

    const { removeTodo, selectedBucket, updateTodo } = useApp()

    function handleCheck(checked: boolean) {

        updateTodo(selectedBucket.id, { ...item, completed: checked }, group_id)
    }

    return (
        <Card sx={{
            my: 1,
            background: item.completed ? '#faebcf' : 'none'
        }}>
            <Box sx={{
                display: 'flex', maxW: 200,
            }}>
                <Box sx={{ pt: 2, pl: 4, minWidth: 150 }}>
                    <CustomText
                        sx={{
                            textDecoration: item.completed ? 'line-through' : 'none'
                        }}
                        fontWeight={700} fontSize={'xs'}>{item.title}</CustomText>
                    <CustomText
                        sx={{
                            textDecoration: item.completed ? 'line-through' : 'none'
                        }}
                        fontSize={'xs'}>
                        {item.description}
                    </CustomText>
                    <Flex sx={{ mt: 2 }}>
                        <TimeIcon sx={{ mr: 1, color: 'orange' }} />

                        <CustomText sx={{
                            border: '1px solid lightgray',
                            display: 'inline-block',
                            px: 2,
                            borderRadius: 4,
                            mb: 1

                        }} fontSize={'xs'}>
                            {
                                item.dueDate ?
                                    new Date(item.dueDate!).toDateString().slice(4, 10)
                                    : '--'
                            }
                        </CustomText>

                    </Flex>

                </Box>
                <Stack sx={{ p: 2, pb: 0 }}>
                    <Checkbox
                        isChecked={item.completed} onChange={e => handleCheck(e.target.checked)}
                    />
                    <DeleteIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => removeTodo(selectedBucket.id, item.id, group_id)} />
                    {/* <MdEdit /> */}
                </Stack>
            </Box>

        </Card >
    )
}