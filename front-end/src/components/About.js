import React, { useEffect, useState } from 'react';

export default function About() {
  const [music, setMusic] = useState(null);
  const [error, setError] = useState(null);
  const musicId = 1; // Remplacez ceci par l'ID de la musique que vous souhaitez obtenir

  useEffect(() => {
    fetch(`http://localhost:8000/musics/${musicId}/`)
      .then((response) => {
        if (!response.ok) {
          // Si une réponse autre que 2xx est retournée
          return Promise.reject('Something went wrong');
        }
        return response.json(); // Parse la réponse en JSON
      })
      .then((data) => {
        setMusic(data); // Met à jour l'état avec les données récupérées
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setError(error); // Met à jour l'état avec l'erreur récupérée
      });
  }, [musicId]);

  return (
    <div>
      <h1>Home Page (Redirection après connexion)</h1>
      {error ? (
        <p>Erreur : {error}</p>
      ) : music ? (
        <p>Titre de la musique : {music.title}</p> // Affiche le titre de la musique
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
