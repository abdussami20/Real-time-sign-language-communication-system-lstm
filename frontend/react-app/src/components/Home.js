import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to  Real Time Sign Language Communication system
        </Typography>
        <Typography variant="h5" color="text.secondary"> 
          Real-time AI-based sign language recognition using LSTM and MediaPipe.
        </Typography> 
      </Box> 
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Detect Signs
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use your camera to detect and recognize sign language in real-time.
              </Typography>
              <Button variant="contained" component={Link} to="/detect" sx={{ mt: 2 }}>
                Start Detecting
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Speech to Text
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Convert speech to text and vice versa for communication.
              </Typography>
              <Button variant="contained" component={Link} to="/speech" sx={{ mt: 2 }}>
                Start Speech
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                About
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Learn more about our sign language recognition technology.
              </Typography>
              <Button variant="contained" component={Link} to="/about" sx={{ mt: 2 }}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
