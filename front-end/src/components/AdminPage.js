import React, { useState, useEffect } from 'react';
import AddMusicForm from './AddMusicForm';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useAuth } from './AuthContext';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const AdminPage = () => {
    const { isLogged } = useAuth();
    const toast = useToast();
    const [musics, setMusics] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchMusics();
        fetchUsers();
    }, []);

    const fetchMusics = async () => {
        try {
          const response = await axios.get('http://localhost:8000/musics/', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
          });
          setMusics(response.data);
        } catch (error) {
          console.error("Error fetching musics:", error);
          toast({
            title: "Fetching Failed",
            description: "Failed to fetch musics.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
    };

    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8000/users/', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
          toast({
            title: "Fetching Failed",
            description: "Failed to fetch users.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
    };

    const handleAddMusic = async (formData) => {
        if (!isLogged) {
            toast({
                title: "Authentication Required",
                description: "You must be logged in to add music.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        const token = localStorage.getItem('access_token');
        try {
            await axios.post('http://localhost:8000/musics/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            toast({
                title: "Success",
                description: "Music added successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            fetchMusics();
        } catch (error) {
            console.error("Error adding music:", error);
            toast({
                title: "Failed",
                description: "Failed to add music.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleDeleteMusic = async (musicId) => {
        if (!isLogged) {
          toast({
            title: "Authentication Required",
            description: "You must be logged in to delete music.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }

        try {
          await axios.delete(`http://localhost:8000/musics/${musicId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
          });
          toast({
            title: "Music Deleted",
            description: "The music has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          fetchMusics();
        } catch (error) {
          console.error("Error deleting music:", error);
          toast({
            title: "Deletion Failed",
            description: "Failed to delete music.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!isLogged) {
          toast({
            title: "Authentication Required",
            description: "You must be logged in to delete user.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }

        try {
          await axios.delete(`http://localhost:8000/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
          });
          toast({
            title: "User Deleted",
            description: "The user has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
          toast({
            title: "Deletion Failed",
            description: "Failed to delete user.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
    };

    return (
        <div>
          <h1>Admin Page</h1>
          <AddMusicForm onAddMusic={handleAddMusic} />
          <h2>Music List</h2>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
            {musics.results && musics.results.map((music) => (
                <Tr key={music.id}>
                <Td>{music.id}</Td>
                <Td>{music.title}</Td>
                <Td>
                    <Button colorScheme="red" onClick={() => handleDeleteMusic(music.id)}>
                    Delete
                    </Button>
                </Td>
                </Tr>
            ))}
            </Tbody>
          </Table>
          <h2>User List</h2>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Username</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
            {users.results && users.results.map((user) => (
                <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.username}</Td>
                <Td>
                    <Button colorScheme="red" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                    </Button>
                </Td>
                </Tr>
            ))}
            </Tbody>
          </Table>
        </div>
      );
    };

export default AdminPage;
