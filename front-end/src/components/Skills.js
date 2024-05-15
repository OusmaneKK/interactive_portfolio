import React from 'react';
import { Box, Heading, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    SimpleGrid,
    Button,
    Image,
    Stack,
} from '@chakra-ui/react';


const Skills = () => {
    return (
        <Box>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            <Card>
                <CardHeader>
                    <Heading size='md' textAlign='center'> frontend-1  | npm ERR! code ENOENT                                                                                                                                                                                                           frontend-1  | npm ERR! syscall open                                                                                                                                                                                                          frontend-1  | npm ERR! path /app/package.json                                                                                                                                                                                                frontend-1  | npm ERR! errno -2                                                                                                                                                                                                              frontend-1  | npm ERR! enoent ENOENT: no such file or directory, open '/app/package.json'                                                                                                                                                    frontend-1  | npm ERR! enoent This is related to npm not being able to find a file.                                                                                                                                                          frontend-1  | npm ERR! enoent     Github Actions</Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing={4} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Image 
                        src='https://github.gallerycdn.vsassets.io/extensions/github/vscode-github-actions/0.26.2/1694016984133/Microsoft.VisualStudio.Services.Icons.Default'
                        alt='Github Actions' 
                        w='75%'
                    />
                    <Text textAlign='center'>View a summary of all your customers over the last month.</Text>
                    </Stack>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size='md' textAlign='center'> Github Actions</Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing={4} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Image 
                        src='https://github.gallerycdn.vsassets.io/extensions/github/vscode-github-actions/0.26.2/1694016984133/Microsoft.VisualStudio.Services.Icons.Default'
                        alt='Github Actions' 
                        w='75%'
                    />
                    <Text textAlign='center'>View a summary of all your customers over the last month.</Text>
                    </Stack>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size='md' textAlign='center'> Github Actions</Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing={4} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Image 
                        src='https://github.gallerycdn.vsassets.io/extensions/github/vscode-github-actions/0.26.2/1694016984133/Microsoft.VisualStudio.Services.Icons.Default'
                        alt='Github Actions' 
                        w='75%'
                    />
                    <Text textAlign='center'>View a summary of all your customers over the last month.</Text>
                    </Stack>
                </CardBody>
            </Card>
            </SimpleGrid>
        </Box>
    );
    }

export default Skills;