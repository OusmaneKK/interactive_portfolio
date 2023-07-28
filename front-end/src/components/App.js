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

const isLogged = false

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {isLogged ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Navigate to="/register" />} />
          )}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
