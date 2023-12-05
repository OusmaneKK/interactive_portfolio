import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './components/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChakraProvider>
);
