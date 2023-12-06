import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Register from './Register'
import Navbar from './Navbar'
import Footer from './Footer'
import Login from './Login'
import Home from './Home'
import About from './About'
import { useAuth } from './AuthContext' // importez useAuth

function App() {
  const { isLogged } = useAuth();
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={isLogged ? <About /> : <Navigate to="/login" />} />
          {isLogged && (
          <>
            <Route path="/about" element={<About />} />
            {/* Ajoutez d'autres routes nécessitant une authentification ici */}
          </>
        )}
        {!isLogged && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Ajoutez d'autres routes publiques ici */}
          </>
        )}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}


export default App
