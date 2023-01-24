import { Box, Input } from '@chakra-ui/react'



export default function Login() {

    return (
        <Box bg='tomato' w={400} style={{
            margin: 'auto',
            textAlign: 'center',
            height: '100vh',
            padding: 20,
            color: 'white'
        }}>
            <h3>Login</h3>
            <form>
                <Input name='password' type={'password'} />
            </form>
        </Box>
    )
};
