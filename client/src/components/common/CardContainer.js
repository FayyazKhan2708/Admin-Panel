import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

const CardContainer = ({ children, p = 6 }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      p={p}
      borderWidth="1px"
      borderColor={borderColor}
      shadow="base"
    >
      {children}
    </Box>
  );
};

export default CardContainer;
