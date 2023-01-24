import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { IconButton } from './CustomButtons';
import { AiFillDelete } from 'react-icons/ai'


export default function GroupedTodoCard() {
    return (
        <Center m={2}>
            <Box
                maxW={'330px'}
                w={'full'}
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

                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                    <List spacing={3}>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="green.400" />
                            All features
                        </ListItem>
                    </List>

                    <Button
                        mt={10}
                        w={'full'}
                        bg={'green.400'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{
                            bg: 'green.500',
                        }}
                        _focus={{
                            bg: 'green.500',
                        }}>
                        Start your trial
                    </Button>
                </Box>
            </Box>
        </Center>
    );
}


export function SingleTodo() {


    return (
        <></>
    )
}