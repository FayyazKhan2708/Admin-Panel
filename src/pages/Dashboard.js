import React from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import StatsGrid from "../components/StatsGrid";
import ActivityChart from "../components/ActivityChart";
import Navbar from "../components/navbar/Navbar";

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Container maxW="container.xl" py={5}>
        <Heading mb={6}>Dashboard</Heading>
        <StatsGrid />
        <ActivityChart />
      </Container>
    </Box>
  );
};

export default Dashboard;
