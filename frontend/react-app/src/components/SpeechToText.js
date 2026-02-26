import React, { useState } from 'react';
import { Container, Typography, Button, Box, Card, CardContent, TextField, Grid } from '@mui/material';

function SpeechToText() {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const startSpeechToText = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Set language as needed

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(prevText => prevText + transcript + ' ');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      alert('Speech recognition error: ' + event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const speakText = () => {
    if (!text.trim()) return;

    if (!('speechSynthesis' in window)) {
      alert('Text to speech not supported in this browser.');
      return;
    }

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set language as needed

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      alert('Speech synthesis error: ' + event.error);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const addSignSentence = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_sign_sentence');
      const data = await response.json();
      if (data.current_sign || data.current_sentence) {
        const newText = text + (data.current_sign ? data.current_sign + ' ' : '') + data.current_sentence;
        setText(newText.trim() + ' ');
      } else {
        alert('No sign or sentence detected yet');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get sign and sentence');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Speech ↔ Text Conversion
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Speak or type something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startSpeechToText}
                  disabled={isRecording}
                >
                  {isRecording ? 'Recording...' : 'Speech to Text'}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={speakText}
                  disabled={isSpeaking || !text.trim()}
                >
                  {isSpeaking ? 'Speaking...' : '🔊 Text to Speech'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={addSignSentence}
                >
                  Add Sign/Sentence
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SpeechToText;
