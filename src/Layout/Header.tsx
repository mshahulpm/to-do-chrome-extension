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
} from '@chakra-ui/react';
import { ChevronRightIcon, } from '@chakra-ui/icons';
import { Bucket } from 'src/@types';
import { useApp } from 'src/context/AppContext';

interface NavItem {
    label: string;
    icon?: React.ReactNode;
    buckets?: Array<Bucket>;
}



export default function Header() {

    return (
        <Box>
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
                    <Button
                        as={'a'}
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                        href={'#'}>
                        Sign In
                    </Button>
                    <Button
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'pink.400'}
                        _hover={{
                            bg: 'pink.300',
                        }}>
                        Sign Up
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    const { buckets, openModel, selectBucket } = useApp()

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
                            Buckets
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




