import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';

export default function Login() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const toast = useToast();
const { handleLogin, isLogged } = useAuth(); 


const handleLoginClick = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/token/', {
      username: username,
      password: password,
    });

    if (response.data.access) {
      await handleLogin({ username, password }); // Enregistrez le token et d'autres informations nécessaires
      navigate('/home');
    }
  } catch (error) {
    toast({
      title: 'Erreur de connexion',
      description: error.response.data.detail,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};

useEffect(() => {
  if (isLogged) {
    navigate('/home');
  }
}, [isLogged, navigate]);
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of my hottests <Link color={'red.400'}>beats</Link> 🔥
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="username" value={username} onChange={e => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleLoginClick}
                >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
