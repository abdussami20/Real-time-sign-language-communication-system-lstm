import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';

function About() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        About This Project
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" paragraph>
            Sign Language Recognition using AI, LSTM, and MediaPipe. This web app allows real-time sign detection, speech-to-text, and translation features for accessibility and communication.
          </Typography>
          <Typography variant="body1" paragraph>
            Our system uses advanced machine learning techniques to recognize sign language gestures in real-time through your webcam. The application also provides speech-to-text conversion and text-to-speech functionality to bridge communication gaps.
          </Typography>
          <Typography variant="body1" paragraph>
            Built with React for the frontend and Flask for the backend, this application demonstrates the power of combining computer vision, natural language processing, and modern web technologies to create inclusive communication tools.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default About;
