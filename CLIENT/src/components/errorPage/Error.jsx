import React from "react";
import { Container, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
const NotFound = () => {
  const nav = useNavigate();
  return (
    <Paper>
      {" "}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <Typography variant="h1" sx={{ marginBottom: 2 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Oops! Page not found.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          to="/"
          onClick={() => {
            nav(ROUTES.ROOT);
          }}
          sx={{ marginTop: 2 }}
        >
          Go to Home
        </Button>
      </Container>
    </Paper>
  );
};

export default NotFound;
