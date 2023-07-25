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
import Musics from './Musics'

const isLogged = true

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/* Move the Navigate component outside the Routes component */}
        {isLogged ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/musics" element={<Musics />} />
          </Routes>
        ) : (
          <Navigate to="/register" />
        )}
        <Footer />
      </Router>
    </>
  )
}

export default App
