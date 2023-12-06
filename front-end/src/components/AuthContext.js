import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUserData = localStorage.getItem('user_data');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });
  const [isLogged, setIsLogged] = useState(localStorage.getItem('access_token') ? true : false);
  const toast = useToast();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [isLogged]);

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
  
      localStorage.setItem('username', username);
      localStorage.setItem('user_id', userId);
      // Stocker les données utilisateur dans le localStorage et mettre à jour currentUser
      localStorage.setItem('user_data', JSON.stringify(userResponse.data));
      setCurrentUser(userResponse.data);
  
      setIsLogged(true);
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

  const handleLogout = async (redirect) => {
    // Suppression des informations de l'utilisateur et du token dans le localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    
    toast({
      title: 'Déconnexion réussie !',
      description: `A bientôt !`,
      status: 'info',
      duration: 9000,
      isClosable: true,
    });
    // Réinitialisation des états
    setIsLogged(false);
    setCurrentUser(null);

    // Redirection ou autre logique après la déconnexion
    if (redirect) redirect();
  };
  
  const value = {
    currentUser,
    setCurrentUser,
    isLogged,
    handleLogin,
    handleLogout
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isLogged, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);