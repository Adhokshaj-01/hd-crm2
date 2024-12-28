import React from 'react';
import { Button, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router for navigation

const SuccessPage = () => {
  // Getting the id from the URL parameters
  const { id } = useParams();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        maxWidth: 550,
        mx: "auto",
        bgcolor: "background.paper",
      }}
    >
      <Card sx={{ width: '100%', sm: '400px', p: 3, boxShadow: 1 , bgcolor: "background.paper"}}>
        <Box display="flex" justifyContent="center" mb={3}>
          <CheckCircle sx={{ color: 'green', fontSize: 64 }} />
        </Box>
        <Typography variant="h5" align="center" sx={{ fontWeight: 600, color: 'text.primary', fontFamily: 'serif' }}>
          Registration Successful
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 1 }}>
          Thank you for registering, You are now successfully enrolled in our system.<br />
          {id && <span>Verification ID: {id}</span>}
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component="a"
            href="/console/dashboard"
            sx={{
              textTransform: 'none',
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default SuccessPage;
