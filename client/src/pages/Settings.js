import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Avatar,
  Button,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import PhoneNumber from "../components/PhoneNumber";
import FormInput from "../components/FormInput";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import CardContainer from "../components/common/CardContainer";
import FormSection from "../components/form/FormSection";

const Settings = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push("Name is required");
    }

    if (!formData.email.trim()) {
      errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    if (!formData.phoneNumber) {
      errors.push("Phone number is required");
    } else if (formData.phoneNumber.length < 10) {
      errors.push("Please enter a valid phone number");
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toast({
          title: "Required Field",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
      return;
    }

    try {
      console.log(formData);

      toast({
        title: "Success",
        description: "Your settings have been saved successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <PageLayout maxW="container.md" py={8}>
      <CardContainer>
        <PageHeader title="Settings" />

        <form onSubmit={handleSubmit}>
          <FormSection>
            <Center flexDirection="column" gap={4}>
              <Avatar size="2xl" src={avatar} bg="teal.500" />
              <Box>
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-upload"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <Button
                  as="label"
                  htmlFor="avatar-upload"
                  colorScheme="teal"
                  size="sm"
                >
                  Upload Picture
                </Button>
              </Box>
            </Center>

            <FormInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />

            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />

            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <PhoneNumber
                value={formData.phoneNumber}
                onChange={(phone) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: phone,
                  }))
                }
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" alignSelf="flex-end">
              Save Changes
            </Button>
          </FormSection>
        </form>
      </CardContainer>
    </PageLayout>
  );
};

export default Settings;
