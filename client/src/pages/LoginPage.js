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

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Attempting login with:", {
      email: formData.email,
      // Don't log the actual password in production
    });

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.status === 200 && data.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        if (data.message === "User not found. Please sign up first.") {
          setTimeout(() => {
            navigate("/signup");
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to server",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <AuthFormContainer title="Login" onSubmit={handleLogin}>
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
