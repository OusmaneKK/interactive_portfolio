import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Divider,
  Show,
  Hide,
  SlideFade,
  Button,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react'


const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/achievements')
      .then(response => {
        setAchievements(response.data.results);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réalisations:', error);
      });
  }, []);

  return (
    <>
      <Heading as="h1" textColor='white'  fontFamily='monospace' borderRadius='2xl' size="xl" w='full' mb="8" textAlign='center' bg='gray.600' >Mes réalisations</Heading>
      <Box display='flex' flexDirection='row' justifyContent='space-around' alignItems='center' flexWrap='wrap'>
        {achievements.map((achievement, index) => (
          <Card key={index} maxW='sm'>
            <CardBody>
              <Image
                src={achievement.image}
                alt={achievement.title}
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md' textAlign='center'>{achievement.title}</Heading>
              </Stack>
            </CardBody>
            <Divider />
            <Text textAlign='center'>
              {achievement.description}
            </Text>
            <CardFooter>
            </CardFooter>
          </Card>
        ))}
      </Box>
    </>
  );
}
export default Achievements; 

