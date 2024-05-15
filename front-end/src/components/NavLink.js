import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Icon, Text } from '@chakra-ui/react';

const NavLink = ({ link }) => (
  <Link to={link.route} style={{ textDecoration: 'none' }}>
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      transition="background-color 1s"
      _hover={{ bg: "gray.200" }}
    >
      {link.icon && <Icon as={link.icon} mr="4" fontSize="16" />}
      <Text>{link.name}</Text>
    </Flex>
  </Link>
);

export default NavLink;