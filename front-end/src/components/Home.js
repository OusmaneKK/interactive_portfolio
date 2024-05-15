import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';
import AudioPlayer from './AudioPlayer';
import { useAuth } from './AuthContext';

const Home = () => {
  const [musics, setMusics] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  const fetchMusics = async () => {
    try {
      const response = await axios.get('http://localhost:8000/musics');
      setMusics(response.data.results);
    } catch (error) {
      console.error('Erreur lors de la récupération des musiques:', error);
    }
  };

  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
      return;
    }

    fetchMusics();
  }, [isLogged, navigate]);


  const playMusic = (music) => {
    console.log("Playing music: ", music.title);
    setCurrentSong(music);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSongTitle = currentSong ? currentSong.title : null;
  const currentSongSrc = currentSong ? currentSong.audio_file : null;

  if (!isLogged) {
    return <Box><Text>Vous devez être connecté pour voir cette page.</Text></Box>;
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 2, md: 3 }} spacing="8" p="8">
        {Array.isArray(musics) && musics.map((music) => (
          <MusicPlayer key={music.id} music={music} onPlay={playMusic} isPlaying={isPlaying}/>
        ))}
      </SimpleGrid>
      {currentSongSrc && (
        <AudioPlayer
          src={currentSongSrc}
          isPlaying={isPlaying}
          onTogglePlay={togglePlayPause}
          currentSongTitle={currentSongTitle}
        />
      )}
    </>
  );
};

export default Home;
