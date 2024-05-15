import React from 'react'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  Spacer,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Stack,
  LinkOverlay,
} from '@chakra-ui/react'
import {
  FiAward,
  FiMusic,
  FiStar,
  FiMenu,
  FiBell,
  FiHome,
  FiChevronDown,
  FiLogIn,
  FiFolder,
  FiEdit,
  FiUser,
  FiTool
} from 'react-icons/fi'

import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

import NavLink from './NavLink';

const LinkItems = [
  { name: 'Home', icon: FiHome, route: '/home' },
  { name: 'About', icon: FiUser, route: '/about' },
  { name: 'Compétences', icon: FiStar, route: '/skills' },
  { name: 'Realisations', icon: FiFolder, route: '/achievements' },
  { name: 'Admin', icon: FiTool, route: '/admin' },
  { name: 'Register', icon: FiEdit, route: '/register' },
  { name: 'Login', icon: FiLogIn, route: '/login' },
]


export default function Navbar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { isLogged, currentUser } = useAuth();
    return (
      <Box
        maxW='sm'
        fontSize="xl"
        fontFamily="monospace"
        display='flex'
        transition="3s ease"
        textColor='white'
        bg="gray.600"
        borderRight="1px"
        borderRightColor="gray.200"
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        <Image
          borderRadius="full"
          boxSize="75px"
          src="/logo.png"
          alt="Drogo The Crow"
          marginLeft='45px'
          _hover={{ bg: "green.300" }}
        />

        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Stack 
      spacing={8}
      >
        {LinkItems.map((link, i) => {
          if (link.name === 'Admin' && (!isLogged || (!currentUser.is_superuser && !currentUser.is_staff))) return null;
          if ((link.name === 'Login' || link.name === 'Register') && isLogged) return null;
          return <NavLink key={i} link={link} />;
        })}
      </Stack>
    </Box>
  );
}

const NavItem = ({ icon, children, to,onClick, ...rest }) => {

  if (children === 'LogOut') {
    return (
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'green.400',
          color: 'white',
        }}
        onClick={onClick}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    );
  }
  return (
    <Link
      to={to}
      style={{ textDecoration: 'none' }}
      {...rest}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'green.400',
          color: 'white',
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}


