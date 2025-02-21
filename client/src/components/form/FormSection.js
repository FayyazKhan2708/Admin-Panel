import React from "react";
import { VStack } from "@chakra-ui/react";

const FormSection = ({ children, spacing = 6 }) => {
  return (
    <VStack spacing={spacing} align="stretch">
      {children}
    </VStack>
  );
};

export default FormSection;
