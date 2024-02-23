import {
    Flex,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
  } from '@chakra-ui/react';
  import { useState } from 'react'

  const AddMusicForm = ({ onAddMusic }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const [musicFile, setMusicFile] = useState(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      if (image) formData.append('image', image);
      if (musicFile) formData.append('audio_file', musicFile);

      onAddMusic(formData);
    };

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Add New Music</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Fill in the details to upload your music 🔥
            </Text>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="title">
                <FormLabel>Title</FormLabel>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </FormControl>
              <FormControl id="author">
                <FormLabel>Author</FormLabel>
                <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
              </FormControl>
              <FormControl id="image">
                <FormLabel>Image</FormLabel>
                <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
              </FormControl>
              <FormControl id="musicFile" isRequired>
                <FormLabel>Music File</FormLabel>
                <Input type="file" onChange={(e) => setMusicFile(e.target.files[0])} required />
              </FormControl>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
              >
                Add Music
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    );
  };

  export default AddMusicForm;
