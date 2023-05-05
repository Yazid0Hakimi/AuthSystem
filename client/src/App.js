import { useState } from "react";
import Register from "./components/Register.js";
import Auth from "./components/Auth.js";
import { Button, Container, Stack } from "@mui/material";


function App() {
  const [pageType, setPageType] = useState("logsin");
  const isLogin = pageType === "login";

  return (
    <Container maxWidth="sm">
      <Stack
        variant="contained"
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"baseline"}
        color="primary"
      >
        <Button onClick={() => setPageType("login")}>Login</Button>
        <Button onClick={() => setPageType("register")}>Register</Button>
      </Stack>
      {isLogin ? <Auth /> : <Register />}
    </Container>
  );
}

export default App;
