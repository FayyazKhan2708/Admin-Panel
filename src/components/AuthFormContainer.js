import React from "react";
import { Container, VStack, Heading, Box } from "@chakra-ui/react";

const AuthFormContainer = ({ title, children, onSubmit }) => {
  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">{title}</Heading>
        <Box as="form" onSubmit={onSubmit}>
          <VStack spacing={4}>{children}</VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default AuthFormContainer;
