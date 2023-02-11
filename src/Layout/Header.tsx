import {
    Box,
    Flex,
    Text,
    Stack,
    Link,
    Popover,
    Button,
    Icon,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    IconButton,
    Tooltip,
} from '@chakra-ui/react';
import { ChevronRightIcon, DeleteIcon, } from '@chakra-ui/icons';
import { Bucket } from 'src/@types';
import { useApp } from 'src/context/AppContext';
import AddTodo from 'src/components/AddTodo';
import { useState } from 'react';
import { BsBucket } from 'react-icons/bs'

interface NavItem {
    label: string;
    icon?: React.ReactNode;
    buckets?: Array<Bucket>;
}



export default function Header() {

    const [todoModal, setTodoModal] = useState(false)
    const { removeBucket, selectedBucketId } = useApp()

    return (
        <Box>
            {todoModal && <AddTodo onClose={() => setTodoModal(false)} />}
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex flex={{ base: 1 }} justify={{ base: 'start' }}>
                    <Text
                        fontWeight={700}
                        fontSize={20}
                        textAlign={'left'}
                        fontFamily={'heading'}
                        color={useColorModeValue('tomato', 'white')}>
                        My Todo
                    </Text>

                    <Flex display={{ base: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>

                    {
                        selectedBucketId !== '123' &&
                        <IconButton
                            onClick={() => removeBucket(selectedBucketId)}
                            sx={{ ml: 4, borderRadius: '50%', fontSize: 15 }} aria-label='button'>
                            <Tooltip label='Delete Bucket' colorScheme={'red'}>
                                <DeleteIcon color={'tomato'} />
                            </Tooltip>
                        </IconButton>
                    }

                    <Button
                        onClick={() => setTodoModal(true)}
                        size={'sm'} variant={'outline'} colorScheme='red'>+ Add Todo</Button>
                </Stack>
            </Flex>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    const { buckets, openModel, removeBucket, selectedBucket } = useApp()
    const noOfItems = selectedBucket.todoLists.length + selectedBucket.groupedTodoLists.length

    return (
        <Stack direction={'row'} spacing={4}>
            <Box >
                <Popover trigger={'hover'} placement={'bottom-start'} >
                    <PopoverTrigger>
                        <Link
                            p={2}
                            href={'#'}
                            fontSize={'sm'}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                                textDecoration: 'none',
                                color: linkHoverColor,
                            }}>
                            <BsBucket style={{ display: 'inline', color: 'tomato', fontSize: 20 }} />
                            {' '} {selectedBucket.name} {' '} ({noOfItems})


                        </Link>
                    </PopoverTrigger>

                    {buckets && (
                        <PopoverContent
                            border={0}
                            boxShadow={'xl'}
                            bg={popoverContentBgColor}
                            p={4}
                            rounded={'xl'}
                            w={200}
                        >
                            <Stack>
                                {buckets.map((bucket) => (
                                    <DesktopSubNav key={bucket.name} {...bucket} />
                                ))}

                                <Button
                                    onClick={() => openModel('bucket')}
                                    colorScheme={'orange'}
                                    size={'sm'} variant='outline' >Add New Bucket</Button>
                            </Stack>

                        </PopoverContent>
                    )}
                </Popover>
            </Box>
        </Stack>
    );
};

const DesktopSubNav = ({ name, description, noOfItems, id }: Bucket) => {

    const { selectBucket } = useApp()

    return (
        <Link
            onClick={() => selectBucket(id)}
            href={'#'}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {name} ({noOfItems})
                    </Text>
                    <Text fontSize={'sm'}>{description}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};




