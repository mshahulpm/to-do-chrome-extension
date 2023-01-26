import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IconButton } from 'src/components/CustomButtons';




export default function Footer() {
    return (
        <Box
            sx={{
                position: 'fixed',
                width: '100%',
                bottom: 0
            }}
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text>© {new Date().getFullYear()} All rights reserved</Text>
                <Text>Made with ❤️ by Mohammed Shahul</Text>
                <Stack direction={'row'} spacing={6}>
                    <IconButton label={'Twitter'} href={'#'}>
                        <FaTwitter />
                    </IconButton>
                    <IconButton label={'YouTube'} href={'#'}>
                        <FaYoutube />
                    </IconButton>
                    <IconButton label={'Instagram'} href={'#'}>
                        <FaInstagram />
                    </IconButton>
                </Stack>
            </Container>
        </Box>
    );
}