import React from "react";
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

const StatCard = ({ title, value, icon }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const iconColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Box p={5} bg={bgColor} rounded="lg" shadow="base">
      <Flex justifyContent="space-between" alignItems="center">
        <Stat>
          <StatLabel fontSize="sm" fontWeight="medium">
            {title}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold">
            {value}
          </StatNumber>
        </Stat>
        <Box p={2} bg="teal.50" rounded="md">
          <Icon as={icon} w={6} h={6} color={iconColor} />
        </Box>
      </Flex>
    </Box>
  );
};

export default StatCard;
