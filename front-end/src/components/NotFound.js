import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

/**
 * NotFoundPage: A React component representing the 404 page.
 */
const NotFoundPage = () => {
    return (
        <Box textAlign="center" mt={20}>
            <Heading as="h1" size="2xl" mb={4}>
                404 - Page Not Found
            </Heading>
            <Text fontSize="xl">
                Oops! The page you are looking for does not exist.
            </Text>
        </Box>
    );
};

export default NotFoundPage;
