import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorOutline } from "@mui/icons-material";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      px={2}
      bgcolor="#f8fafc"
    >
      <ErrorOutline sx={{ fontSize: 100, color: "error.main", mb: 2 }} />
      <Typography variant="h3" color="error" fontWeight="bold">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={2} mb={4}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
