import React from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const NavItem = ({ name, path }) => {
  const location = useLocation();
  const activeColor = useColorModeValue("teal.500", "teal.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Button
      as={RouterLink}
      to={path}
      variant="ghost"
      px={3}
      py={2}
      fontSize="md"
      color={location.pathname === path ? activeColor : "inherit"}
      _hover={{
        bg: hoverBg,
      }}
    >
      {name}
    </Button>
  );
};

export default NavItem;
