import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const toast = useToast();


  const handleLogin = async (data) => {
    const { username, password } = data;
    try {
      const tokenResponse = await axios.post('http://localhost:8000/api/token/', {
        username: username,
        password: password,
      });
      localStorage.setItem('access_token', tokenResponse.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.access}`;

      const userResponse = await axios.get('http://localhost:8000/users/me');
      const userId = userResponse.data.id;
      console.log(userResponse.data.username)
      localStorage.setItem('username', username);
      localStorage.setItem('user_id', userId);
      setIsLogged(true);
      setCurrentUser(userResponse.data);
      toast({
        title: 'Connexion réussie !',
        description: `Bienvenue, ${userResponse.data.username} !`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      setIsLogged(false);
      toast({
        title: 'Connexion impossible !',
        description: error.response?.data?.detail || 'Une erreur est survenue.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    isLogged,
    handleLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);