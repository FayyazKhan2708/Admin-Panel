import React, { useState } from "react";
import { Button, Text, Link, VStack } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import AuthFormContainer from "../components/AuthFormContainer";
import { useToast } from "@chakra-ui/react";

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.email.trim()) {
      errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    if (!formData.password.trim()) {
      errors.push("Password is required");
    } else if (formData.password.length < 6) {
      errors.push("Password must be at least 6 characters long");
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
        title: "Logged in successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <AuthFormContainer title="Login" onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        isRequired
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        isRequired
      />

      <Button type="submit" colorScheme="blue" width="full">
        Login
      </Button>

      <Text textAlign="center">
        Don't have an account?{" "}
        <Link as={RouterLink} to="/signup" color="blue.500">
          Sign Up
        </Link>
      </Text>
    </AuthFormContainer>
  );
};

export default LoginPage;
