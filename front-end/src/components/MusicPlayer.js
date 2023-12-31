// import React, { useState, useRef } from 'react';
// import { Flex, IconButton, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
// import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';

// const MusicPlayer = () => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(0.5);
//   const [isMuted, setIsMuted] = useState(false);

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleTimeUpdate = () => {
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   const handleLoadedData = () => {
//     setDuration(audioRef.current.duration);
//   };

//   const handleVolumeChange = (value) => {
//     audioRef.current.volume = value;
//     setVolume(value);
//     setIsMuted(value === 0);
//   };

//   const handleMuteUnmute = () => {
//     if (isMuted) {
//       audioRef.current.volume = volume;
//     } else {
//       audioRef.current.volume = 0;
//     }
//     setIsMuted(!isMuted);
//   };

//   return (
//     <Flex flexDirection="column" alignItems="center" p={4}>
//       {/* Audio Element */}
//       <audio
//         ref={audioRef}
//         src="/son1.mp3"
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedData={handleLoadedData}
//       />

//       {/* Play/Pause Button */}
//       <IconButton
//         icon={isPlaying ? <FiPause /> : <FiPlay />}
//         size="lg"
//         onClick={handlePlayPause}
//         aria-label={isPlaying ? 'Pause' : 'Play'}
//         mb={2}
//       />

//       {/* Progress Slider */}
//       <Slider defaultValue={0} value={currentTime} max={duration} onChange={(value) => setCurrentTime(value)}>
//         <SliderTrack>
//           <SliderFilledTrack />
//         </SliderTrack>
//         <SliderThumb />
//       </Slider>

//       {/* Time Information */}
//       <Flex justifyContent="space-between" width="100%">
//         <Text>{formatTime(currentTime)}</Text>
//         <Text>{formatTime(duration)}</Text>
//       </Flex>

//       {/* Volume Controls */}
//       <Flex alignItems="center" mt={4}>
//         <IconButton
//           icon={isMuted ? <FiVolumeX /> : <FiVolume2 />}
//           size="md"
//           onClick={handleMuteUnmute}
//           aria-label={isMuted ? 'Unmute' : 'Mute'}
//           mr={2}
//         />
//         <Slider defaultValue={0.5} value={volume} max={1} onChange={handleVolumeChange}>
//           <SliderTrack>
//             <SliderFilledTrack />
//           </SliderTrack>
//           <SliderThumb />
//         </Slider>
//       </Flex>
//     </Flex>
//   );
// };

// // Helper function to format time in seconds to MM:SS format
// const formatTime = (timeInSeconds) => {
//   const minutes = Math.floor(timeInSeconds / 60);
//   const seconds = Math.floor(timeInSeconds % 60);
//   return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// };

// export default MusicPlayer;

import React from 'react';
import { Box, Image, Text, Flex, IconButton, Link } from '@chakra-ui/react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

const MusicPlayer = ({ music }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
      <Image src={music.image} alt={`Cover for ${music.title}`} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {music.title}
          </Text>
        </Box>

        <Text fontWeight="bold">{music.owner}</Text>

        <Flex mt="4" alignItems="center">
          <IconButton icon={<FaBackward />} aria-label="Previous song" />
          <Link href={music.audio_file} target="_blank">
            <IconButton ml="4" icon={<FaPlay />} aria-label="Play song" />
          </Link>
          <IconButton ml="4" icon={<FaForward />} aria-label="Next song" />
        </Flex>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
