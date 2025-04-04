import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Icon } from "@chakra-ui/react";

const BackIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
    />
  </Icon>
);

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      icon={<BackIcon />}
      onClick={() => navigate(-1)}
      variant="unstyled"
      aria-label="Go back"
      display="flex"
      alignItems="center"
      fontSize="24px"
      size="lg"
    />
  );
};

export default BackButton;
