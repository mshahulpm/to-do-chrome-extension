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

type GroupTodoProps = {
    no?: number
}
export default function GroupedTodoCard({ no = 1 }: GroupTodoProps) {


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
                        Hobby
                    </Text>
                    <IconButton label='Delete' >
                        <AiFillDelete style={{ color: 'tomato' }} />
                    </IconButton>
                </Stack>

                <Box bg={useColorModeValue('gray.50', 'gray.900')} p={3} >
                    {
                        new Array(no).fill(0).map((i, ind) => (
                            <SingleTodo key={ind} />
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


export function SingleTodo() {



    return (
        <Card sx={{ my: 1 }}>
            <Box sx={{ display: 'flex', maxW: 200 }}>
                <Box sx={{ py: 2, pl: 4, minWidth: 150 }}>
                    <CustomText fontWeight={700} fontSize={'xs'}>To do name</CustomText>
                    <CustomText fontSize={'xs'}>Description about doing the stuff all over</CustomText>
                    <CustomText sx={{
                        border: '1px solid lightgray',
                        display: 'inline-block',
                        px: 2,
                        borderRadius: 4

                    }} fontSize={'xs'}>25 feb</CustomText>
                </Box>
                <Stack sx={{ p: 2 }}>
                    <Checkbox />
                    <DeleteIcon />
                    <MdEdit />
                </Stack>
            </Box>

        </Card >
    )
}