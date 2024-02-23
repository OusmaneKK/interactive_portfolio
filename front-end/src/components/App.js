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
import AdminPage from './AdminPage'; // Importez votre page d'administration
import PrivateRoute from './PrivateRoute'; // Ajustez le chemin selon l'emplacement réel de PrivateRoute

function App() {
  const { isLogged, currentUser } = useAuth();
  const isSuperuser = currentUser?.is_superuser; // Utilisez is_superuser pour vérifier les droits d'administration

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
          {/* Utilisez isSuperuser pour protéger la route /admin */}
          <Route path="/admin" element={isLogged && isSuperuser ? <AdminPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer/>
        </Navbar>
      </Router>
    </>
  );
}

export default App;
