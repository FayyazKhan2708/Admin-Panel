import React from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import NavItem from "./NavItem";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Enterprises", path: "" },
  { name: "Members", path: "" },
  { name: "Applications", path: "" },
  { name: "Reports", path: "" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const brandColor = useColorModeValue("teal.600", "teal.300");

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
    <Box
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Container maxW="container.xl">
        <Flex h="60px" alignItems="center" justifyContent="space-between">
          <HStack spacing={16 } alignItems="center">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="tight"
              fontFamily="'Poppins', sans-serif"
              bgGradient={`linear(to-r, ${brandColor}, teal.400)`}
              bgClip="text"
              _hover={{
                bgGradient: `linear(to-r, teal.400, ${brandColor})`,
                cursor: "pointer",
              }}
              onClick={handleLogoClick}
              display="flex"
              alignItems="center"
            >
              Admin Panel
            </Text>

            <HStack spacing={20}>
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.name} {...item} />
              ))}
            </HStack>
          </HStack>
          <HStack spacing={4}>
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="notifications"
              icon={<FaBell />}
            />
            <ProfileMenu />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
