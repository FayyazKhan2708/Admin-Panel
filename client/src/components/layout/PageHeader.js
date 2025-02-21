import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import BackButton from "../BackButton";

const PageHeader = ({ title, showBackButton = true }) => {
  return (
    <Flex align="center" mb={6} gap={4}>
      {showBackButton && <BackButton />}
      <Heading size="lg">{title}</Heading>
    </Flex>
  );
};

export default PageHeader;
