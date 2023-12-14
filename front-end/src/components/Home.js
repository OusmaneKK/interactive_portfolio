import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';
import { useAuth } from './AuthContext'; // Assurez-vous que le chemin d'importation est correct

const Home = () => {
  const [musics, setMusics] = useState([]);
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
      return;
    }

    const fetchMusics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/musics');
        setMusics(response.data.results); // Utilisez results ici
      } catch (error) {
        console.error('Erreur lors de la récupération des musiques:', error);
        // Gérer l'erreur ici
      }
    };

    fetchMusics();
  }, [isLogged, navigate]);

  if (!isLogged) {
    return <Box><Text>Vous devez être connecté pour voir cette page.</Text></Box>;
  }

  return (
    <SimpleGrid columns={{ sm: 2, md: 3 }} spacing="8" p="8">
      {Array.isArray(musics) && musics.map((music) => (
        <MusicPlayer key={music.id} music={music} />
      ))}
    </SimpleGrid>
  );
};

export default Home;
