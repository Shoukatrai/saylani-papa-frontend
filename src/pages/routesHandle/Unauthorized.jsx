import { Warning } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const Unauthorized = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgcolor="#fef2f2"
            textAlign="center"
            px={2}
        >
            <Warning sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
            <Typography variant="h4" color="error" fontWeight="bold" gutterBottom>
                Access Denied!
            </Typography>
            <Typography variant="body1" color="error.main" mb={4}>
                You are not authorized to view this page. Please log in with valid credentials.
            </Typography>
            <Button variant="contained" color="error" href="/login">
                Go to Login
            </Button>
        </Box>

    )
}

export default Unauthorized
