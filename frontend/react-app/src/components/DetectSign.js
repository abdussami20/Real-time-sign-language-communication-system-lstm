import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Button, Box, Card, CardContent, Grid } from '@mui/material';
import io from 'socket.io-client';

function DetectSign() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [currentSign, setCurrentSign] = useState('-');
  const [currentSentence, setCurrentSentence] = useState('-');
  const videoRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('sign_update', (data) => {
      setCurrentSign(data.current_sign || '-');
      setCurrentSentence(data.sentence || '-');
    }); 

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);


  const startCamera = () => {
    setIsDetecting(true); 
    if (videoRef.current) {
      videoRef.current.src = 'http://localhost:5000/video_feed';
    }
  };

  const clearSentence = () => {
    setCurrentSentence('-');
  };

  const stopCamera = () => {
    setIsDetecting(false);
    if (videoRef.current) {
      videoRef.current.src = '';
    }
    setCurrentSign('-');
    setCurrentSentence('-');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8}}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Sign Language Detection
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startCamera}
                  disabled={isDetecting}
                  sx={{ mr: 2 }}
                >
                  Start Detection
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={stopCamera}
                  disabled={!isDetecting}
                  sx={{ mr: 2 }}
                >
                  Stop Detection
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={clearSentence}
                  sx={{ ml: 2 }}
                >
                  Clear Sentence
                </Button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img
                  ref={videoRef}
                  alt="Video Feed"
                  style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc' }}
                />
              </Box>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Current Sign
                </Typography>
                <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
                  {currentSign}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Current Sentence
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                  {currentSentence}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DetectSign;
