import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import StatsGrid from "../components/StatsGrid";
import ActivityChart from "../components/ActivityChart";
import Navbar from "../components/navbar/Navbar";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setUserData(data.user);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load user data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, toast]);

  if (loading) {
    return (
      <Box>
        <Navbar />
        <Container maxW="container.xl" py={5}>
          <Text>Loading...</Text>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Container maxW="container.xl" py={5}>
        <Heading mb={6}>Dashboard</Heading>

        {userData && (
          <Box mb={6} p={6} borderWidth={1} borderRadius="lg" bg="white">
            <Heading size="md" mb={4}>
              User Profile
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <VStack align="start">
                  <Text fontWeight="bold">Username</Text>
                  <Text>{userData.username}</Text>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="start">
                  <Text fontWeight="bold">Email</Text>
                  <Text>{userData.email}</Text>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="start">
                  <Text fontWeight="bold">Mobile</Text>
                  <Text>{userData.mobile || "Not provided"}</Text>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="start">
                  <Text fontWeight="bold">Account Created</Text>
                  <Text>
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        )}

        <StatsGrid />
        <ActivityChart />
      </Container>
    </Box>
  );
};

export default Dashboard;
