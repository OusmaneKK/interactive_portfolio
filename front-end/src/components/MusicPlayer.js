import React from 'react';
import { Box, Image, Text, Flex, IconButton, Link } from '@chakra-ui/react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

const MusicPlayer = ({ music, onPlay, isPlaying, currentTime }) => {
  return (
    <Box border="1px" borderColor="gray.200" p="4" borderRadius="md">
      <Image src={music.image} alt={`Cover for ${music.title}`} />
      <Text>{music.title}</Text>
      <Text fontSize="sm">{music.owner}</Text>
      <IconButton
        icon={<FaPlay />}
        onClick={() => onPlay(music)}
        aria-label="Play Music"
      />
    </Box>
  );
};

export default MusicPlayer;
