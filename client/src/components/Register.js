import React, { useState } from "react";
import { TextField, Button, Container, Typography, Stack  } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send POST request using Fetch API
    fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log("Response:", data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
       
      </form>
    </Container>
  );
};

export default Register;
