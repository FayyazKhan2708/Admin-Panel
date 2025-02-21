import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const handleSignOut = () => {
    navigate("/login", { replace: true });
  };

  const menuItems = [
    { label: "Profile", action: () => navigate("/profile") },
    { label: "Settings", action: () => navigate("/settings") },
    { label: "Sign Out", action: handleSignOut, isRed: true },
  ];

  return (
    <Menu>
      <MenuButton>
        <Avatar size="sm" bg="teal.500" cursor="pointer" />
      </MenuButton>
      <MenuList bg={bgColor} borderColor={borderColor} boxShadow="lg" py={2}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.label}>
            {index === menuItems.length - 1 && <MenuDivider />}
            <MenuItem
              onClick={item.action}
              _hover={{ bg: hoverBg }}
              fontSize="sm"
              px={4}
              color={item.isRed ? "red.500" : "inherit"}
            >
              {item.label}
            </MenuItem>
          </React.Fragment>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
