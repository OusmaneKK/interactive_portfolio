import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [groups, setGroups] = useState('')
  const navigate = useNavigate();
  const toast = useToast()

  const checkEmailUniqueness = async (email) => {
    try {
      const response = await axios.post('http://localhost:8000/api/check-email', { email });
      if (response.data.isUnique) {
        setIsEmailUnique(response.data.isUnique);
      } else {
        setIsEmailUnique(false);
        toast({
          title: 'E-mail déjà utilisé',
          description: "L'adresse e-mail est déjà associée à un compte.",
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'e-mail :', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailUnique) {
      toast({
        title: 'Email verification failed',
        description: 'Please use a different email address.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/register/', {
      username: username,
      email: email,
      password: password,
      groups: groups,
      });
      console.log('Inscription réussie :', response);
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate('/login');
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'inscription :', error);
      setPassword('');
      setConfirmPassword('');
      toast({
        title: 'Error.',
        description: "Account cannot be created",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  };

  useEffect(() => {
    if (email) {
      checkEmailUniqueness(email);
    }
  }, [email]);


  return (
    <>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((prevShowPassword) => !prevShowPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSubmit}  // Gérer le clic sur le bouton
            >
            Sign up
            </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link href='/login' color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  )
}
