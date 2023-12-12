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
import NotFoundPage from './NotFound'
import { useAuth } from './AuthContext' // importez useAuth

function App() {
  const { isLogged } = useAuth();
  return (
    <>
      <Router>
        <Navbar>
        <Routes>
          <Route path="/" element={isLogged ? <Home /> : <Navigate to="/login" />} />
          <Route path="/home" element={isLogged ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        </Navbar>
      </Router>
    </>
  );
}


export default App
