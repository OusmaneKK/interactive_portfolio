import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Box, Progress } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa';

const AudioPlayer = ({ src, isPlaying, onTogglePlay }) => {
  const audioRef = useRef(null); // Référence pour l'élément audio
  const [progress, setProgress] = useState(0); // Pourcentage de la progression de la lecture

  useEffect(() => {
    // Mettre à jour la source de l'audio quand elle change
    audioRef.current.src = src;
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.onloadedmetadata = () => {
      if (isPlaying) {
        audio.play();
      }
    };
  }, [audioRef, isPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <Box position="fixed" bottom="0" left="0" right="0" bg="gray.100" p="2">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onTogglePlay(false)}
      />
      <IconButton
        icon={isPlaying ? <FaPause /> : <FaPlay />}
        onClick={() => onTogglePlay(!isPlaying)}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      />
      <Progress value={progress} />
    </Box>
  );
};

export default AudioPlayer;
