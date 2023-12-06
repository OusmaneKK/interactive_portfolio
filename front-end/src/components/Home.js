import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

export default function Home() {
  const { currentUser } = useAuth(); // Utilisation du contexte d'authentification
  const [music, setMusic] = useState(null);
  const [error, setError] = useState(null);
  const musicId = 1; // Remplacez ceci par l'ID de la musique que vous souhaitez obtenir

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté avant de faire une requête
    if (currentUser) {
      fetch(`http://localhost:8000/musics/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response) => {
        // ... le reste de votre logique de requête ...
      });
    } else {
      setError("Vous devez être connecté pour voir les informations de la musique.");
    }
  }, [currentUser, musicId]);

  return (
    <div>
      <h1>Home Page</h1>
      {error ? (
        <p>Erreur : {error}</p>
      ) : music ? (
        <p>Titre de la musique : {music.title}</p>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
