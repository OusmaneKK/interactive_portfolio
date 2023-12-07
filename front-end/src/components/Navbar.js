import React from 'react'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
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
  LinkOverlay,
} from '@chakra-ui/react'
import {
  FiAward,
  FiMusic,
  FiStar,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiLogIn,
  FiLogOut,
  FiEdit,
  FiUser,
} from 'react-icons/fi'

import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

import NavLink from './NavLink';

const LinkItems = [
  { name: 'About', icon: FiUser, route: '/about' },
  { name: 'MostLiked', icon: FiAward, route: '/top' },
  { name: 'Musics', icon: FiMusic, route: '/musics' },
  { name: 'Liked', icon: FiStar, route: '/liked' },
  { name: 'Register', icon: FiEdit, route: '/register' },
  { name: 'Login', icon: FiLogIn, route: '/login' },
  { name: 'LogOut', icon: FiLogOut },
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
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { isLogged, handleLogout } = useAuth();
    return (
      <Box
        transition="3s ease"
        bg="white"
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
            
          />
          </Text>
          <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link, i) => {
        if ((link.name === 'Login' || link.name === 'Register') && isLogged) return null;
        if (link.name === 'LogOut' && !isLogged) return null;
        return <NavLink key={i} link={link} />;
      })}
      </Box>
    );
}

const NavItem = ({ icon, children, to,onClick, ...rest }) => {

  // Si l'élément est "LogOut", utilisez un gestionnaire de clic au lieu d'un lien de navigation
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

const MobileNav = ({ onOpen, ...rest }) => {
  const { currentUser, handleLogout, isLogged } = useAuth(); // Utilisation du contexte d'authentification
  const navigate = useNavigate();
  const logoutAndRedirect = () => {
    handleLogout(() => navigate('/login'));
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Drogo Playstore
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{currentUser ? currentUser.username : 'Guest'}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {currentUser ? 'Admin' : 'Visitor'}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              {!isLogged && (
              <Link to="/login">
                <MenuItem>Login</MenuItem>
              </Link>
              )}
              <MenuDivider />
              {isLogged && (
                <MenuItem onClick={logoutAndRedirect}>Sign out</MenuItem> // Bouton de déconnexion
              )}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
