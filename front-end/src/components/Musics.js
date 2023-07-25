import { StarIcon } from '@chakra-ui/icons'
import { Badge, Box, Image } from '@chakra-ui/react'
import React from 'react'
import MusicPlayer from './MusicPlayer'

// Utiliser le blog list de chakra
export default function Musics() {
    const property = {
      imageUrl: '/logo.png',
      imageAlt: 'Music By Drogo The Crow',
      musicUrl: '/son1.mp3' ,
      bpm: '110',
      key: 'A minor',
      title: 'suspect.',
      tag: 'Trap',
      formattedPrice: '€30',
      reviewCount: 34,
      rating: 4,
    }
  
    return (
      
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' marginLeft='20%'>
        <Image src={property.imageUrl} alt={property.imageAlt} />
        <MusicPlayer/>
        <Box p='3' >
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              {property.tag}
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {property.bpm} bpm &bull; {property.key}
            </Box>
          </Box>
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {property.title}
          </Box>
  
          <Box>
            {property.formattedPrice}
            <Box as='span' color='gray.600' fontSize='sm'>
              / mp3 File
            </Box>
          </Box>
  
          <Box display='flex' mt='2' alignItems='center'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {property.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }