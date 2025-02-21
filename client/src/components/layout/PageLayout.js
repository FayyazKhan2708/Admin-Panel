import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../navbar/Navbar";

const PageLayout = ({ children, maxW = "container.xl", py = 5 }) => {
  return (
    <Box>
      <Navbar />
      <Container maxW={maxW} py={py}>
        {children}
      </Container>
    </Box>
  );
};

export default PageLayout;
