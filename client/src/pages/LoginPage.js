import React, { useState } from "react";
import { Button, Text, Link, VStack, Box } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    <Box
      position="relative"
      minH="100vh"
      bg="linear-gradient(to bottom, #e0f2fe, #ede9fe, #fce7f3)"
      overflow="hidden"
    >
      {/* Animated background shapes */}
      <Box position="absolute" inset="0" zIndex="0" overflow="hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "100%",
              backgroundColor: "rgba(253, 224, 71, 0.3)",
              width: `${80 + i * 20}px`,
              height: `${80 + i * 20}px`,
              top: `${10 + i * 15}%`,
              left: `${5 + i * 18}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i + 5}
            style={{
              position: "absolute",
              borderRadius: "100%",
              backgroundColor: "rgba(191, 219, 254, 0.3)",
              width: `${100 + i * 20}px`,
              height: `${100 + i * 20}px`,
              bottom: `${5 + i * 12}%`,
              right: `${8 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.6,
            }}
          />
        ))}

        {/* Floating math symbols */}
        <motion.div
          style={{
            position: "absolute",
            top: "10%",
            left: "25%",
            fontSize: "5rem",
            color: "rgba(99, 102, 241, 0.7)",
            transform: "rotate(12deg)",
          }}
          animate={{ y: [0, -15, 0], rotate: [12, 20, 12] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          +
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            top: "8%",
            right: "25%",
            fontSize: "5rem",
            color: "rgba(219, 39, 119, 0.7)",
            transform: "rotate(-12deg)",
          }}
          animate={{ y: [0, -20, 0], rotate: [-12, -25, -12] }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
        >
          ÷
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            top: "15%",
            left: "35%",
            fontSize: "4rem",
            color: "rgba(16, 185, 129, 0.7)",
            transform: "rotate(45deg)",
          }}
          animate={{ y: [0, -10, 0], rotate: [45, 30, 45] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          ×
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            top: "12%",
            right: "35%",
            fontSize: "4rem",
            color: "rgba(245, 158, 11, 0.7)",
            transform: "rotate(-20deg)",
          }}
          animate={{ y: [0, -15, 0], rotate: [-20, -10, -20] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1.5 }}
        >
          −
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "6rem",
            color: "rgba(59, 130, 246, 0.7)",
          }}
          animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          =
        </motion.div>

        {/* Additional math symbols at the bottom of the page */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "15%",
            fontSize: "4rem",
            color: "rgba(139, 92, 246, 0.5)",
            transform: "rotate(-15deg)",
          }}
          animate={{ y: [0, 10, 0], rotate: [-15, -5, -15] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >
          π
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            bottom: "25%",
            right: "15%",
            fontSize: "3.5rem",
            color: "rgba(236, 72, 153, 0.5)",
            transform: "rotate(10deg)",
          }}
          animate={{ y: [0, 15, 0], rotate: [10, 20, 10] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        >
          √
        </motion.div>
      </Box>

      <Box position="relative" zIndex="1">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
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

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              width="100%"
            >
              <Button type="submit" colorScheme="blue" width="full">
                Login
              </Button>
            </motion.div>

            <Text textAlign="center">
              Don't have an account?{" "}
              <Link as={RouterLink} to="/signup" color="blue.500">
                Sign Up
              </Link>
            </Text>
          </AuthFormContainer>
        </motion.div>
      </Box>
    </Box>
  );
};

export default LoginPage;
