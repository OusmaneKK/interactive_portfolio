import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Box, Progress, Text, Flex } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa';
import PropTypes from 'prop-types';



const AudioPlayer = ({ src, isPlaying, onTogglePlay, currentSongTitle }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = src;

    const setAudioData = () => setDuration(audio.duration);
    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / duration) * 100);
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, [src, duration]);

  useEffect(() => {
    const audio = audioRef.current;
    const tryPlay = () => {
      audio.play().catch(error => console.error("Error attempting to play audio:", error));
    };

    if (audio) {
      audio.addEventListener('canplaythrough', tryPlay);
      return () => audio.removeEventListener('canplaythrough', tryPlay);
    }
  }, [src]);

  useEffect(() => {
    console.log("isPlaying changed: ", isPlaying);
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Tente de démarrer la lecture
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error attempting to play audio:", error);
        });
      }
    } else {
      // Met en pause si isPlaying est false
      audio.pause();
    }
  }, [isPlaying]);


  // Formater le temps en minutes:secondes
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Gérer le clic sur la barre de progression pour changer la position de lecture
  const handleProgressClick = e => {
    const audio = audioRef.current;
    if (!audio) return;

    const clickX = e.nativeEvent.offsetX;
    const progressBarWidth = e.currentTarget.clientWidth;
    const newTime = (clickX / progressBarWidth) * duration;
    audio.currentTime = newTime;
  };

  return (
    <Box position="fixed" bottom="0" left="0" right="0" p="3" boxShadow="md" bg="gray.900">
      <audio ref={audioRef} />
      <Flex justifyContent="center" alignItems="center">
        <Box width="80%" bg="white" p="3" borderRadius="lg" boxShadow="base">
          <Flex alignItems="center" justifyContent="space-between">
            <IconButton
              icon={isPlaying ? <FaPause /> : <FaPlay />}
              onClick={() => onTogglePlay(!isPlaying)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              colorScheme="teal"
              size="lg"
              isRound
              mr="4"
            />
            <Text flex="1" textAlign="center" fontSize="md" fontWeight="bold" noOfLines={1} mr="4">
              {currentSongTitle || 'Titre inconnu'}
            </Text>
            <Flex flexDir="column" flex="1">
              <Progress
                value={progress}
                size="lg"
                colorScheme="teal"
                borderRadius="md"
                onClick={handleProgressClick}
                cursor="pointer"
              />
              <Text color="gray.400" mt="2" fontSize="sm" textAlign="right">{formatTime(currentTime)} / {formatTime(duration)}</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  currentSongTitle: PropTypes.string
};

export default AudioPlayer;
