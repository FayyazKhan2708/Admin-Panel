import React from "react";
import { Container, VStack, Heading, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const AuthFormContainer = ({ title, children, onSubmit }) => {
  return (
    <Container maxW="container.sm" py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        bg="white"
        shadow="xl"
        borderRadius="xl"
        p={8}
        border="1px"
        borderColor="gray.100"
        _hover={{ shadow: "2xl" }}
      >
        <VStack spacing={8} align="stretch">
          <MotionHeading
            textAlign="center"
            bgGradient="linear(to-r, blue.600, purple.600, pink.600)"
            bgClip="text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {title}
          </MotionHeading>
          <Box as="form" onSubmit={onSubmit}>
            <VStack spacing={4}>{children}</VStack>
          </Box>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default AuthFormContainer;
