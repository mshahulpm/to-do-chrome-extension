import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
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
                <Stack direction={'row'} spacing={6}>
                    <Text>Made with ❤️ by
                        <a
                            style={{ marginLeft: '5px', textDecoration: 'underline' }}
                            href='https://mshahulpm.github.io/' target={'_blank'}>
                            Mohammed Shahul
                        </a>
                    </Text>
                    <IconButton label={'Github'} href={'https://github.com/mshahulpm'}>
                        <FaGithub />
                    </IconButton>
                    <IconButton label={'LinkedIn'} href={'https://linkedin.com/in/mshhaulpm/'}>
                        <FaLinkedin />
                    </IconButton>
                    <IconButton label={'Instagram'} href={'https://instagram.com/shahul__pm/'}>
                        <FaInstagram />
                    </IconButton>
                </Stack>
            </Container>
        </Box>
    );
}