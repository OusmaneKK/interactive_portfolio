import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Navbar/>
      <App />
      <Footer/>
    </ChakraProvider>
  </React.StrictMode>
);
