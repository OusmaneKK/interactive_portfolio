import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './Register';
import Navbar from './Navbar';
import Footer from './Footer';
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/register' element={<Register />} />
        </Routes>
          <Footer/>
      </Router>
    </ChakraProvider>
  );
}

export default App
