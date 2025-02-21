import React, { useState } from "react";
import {
  Button,
  Text,
  Link,
  VStack,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import PhoneNumber from "../components/PhoneNumber";
import AuthFormContainer from "../components/AuthFormContainer";

const SignUpPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      mobile: value,
    }));
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) {
      return;
    }

    // Log the data being sent
    const signupData = {
      username: formData.name, // Make sure this matches your form field
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile,
    };

    console.log("Sending signup data:", signupData);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        toast({
          title: "Account created successfully",
          description: "Please login with your credentials",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast({
          title: "Signup failed",
          description: data.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <AuthFormContainer title="Sign Up" onSubmit={handleSubmit}>
      <FormInput
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter your full name"
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
        <FormLabel>Mobile Number</FormLabel>
        <PhoneNumber value={formData.mobile} onChange={handlePhoneChange} />
      </FormControl>

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm your password"
      />

      <Button type="submit" colorScheme="blue" width="full">
        Sign Up
      </Button>

      <Text textAlign="center">
        Already have an account?{" "}
        <Link as={RouterLink} to="/login" color="blue.500">
          Login
        </Link>
      </Text>
    </AuthFormContainer>
  );
};

export default SignUpPage;
