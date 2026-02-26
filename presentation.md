# FYP Project Presentation: Real-Time Sign Language Communication System

## Slide 1: Title Slide
- **Project Title:** Real-Time Sign Language Communication System for Deaf-Mute Individuals
- **Student Name:** [Your Name]
- **Supervisor:** [Supervisor Name]
- **Date:** [Presentation Date]
- **Institution:** [Your University]

## Slide 2: Agenda
- Introduction
- Problem Statement
- Project Objectives
- System Overview
- Architecture and Technologies
- How the System Works
- Implementation Details
- Demo
- Challenges Faced
- Future Enhancements
- Conclusion

## Slide 3: Introduction
- **What is the Project?**
  - A web-based application that facilitates communication between deaf-mute individuals and others using real-time sign language detection and speech conversion.
- **Key Features:**
  - Real-time sign language recognition
  - Sentence building from detected signs
  - Speech-to-Text conversion
  - Text-to-Speech synthesis
  - User-friendly web interface

## Slide 4: Problem Statement
- Deaf-mute individuals face communication barriers in daily interactions.
- Lack of accessible tools for real-time sign language translation.
- Existing solutions are often expensive, not portable, or require specialized hardware.
- Need for an affordable, web-based solution that can run on standard devices.

## Slide 5: Project Objectives
- Develop a real-time sign language detection system using computer vision and machine learning.
- Integrate speech-to-text and text-to-speech functionalities.
- Create a responsive web application for easy access.
- Ensure accuracy and usability for practical communication.

## Slide 6: System Overview
- **Frontend:** React.js web application with Material-UI components.
- **Backend:** Flask server with Socket.IO for real-time communication.
- **Core Functionality:**
  - Video feed processing for sign detection.
  - LSTM model for predicting sign language gestures.
  - API endpoints for speech conversion.
- **Target Users:** Deaf-mute individuals, educators, family members.

## Slide 7: Architecture Diagram
- [Insert Diagram Here]
  - User Interface (React)
  - Backend Server (Flask)
  - Video Processing (OpenCV, MediaPipe)
  - Machine Learning Model (TensorFlow LSTM)
  - Speech Services (Google Speech API, pyttsx3)
  - Real-time Communication (Socket.IO)

## Slide 8: Technologies Used
- **Frontend:**
  - React.js
  - Material-UI
  - Socket.IO Client
- **Backend:**
  - Flask
  - Flask-CORS
  - Socket.IO
- **Computer Vision & ML:**
  - OpenCV
  - MediaPipe
  - TensorFlow/Keras
- **Speech Processing:**
  - SpeechRecognition (Google API)
  - pyttsx3
- **Other:**
  - NumPy
  - Python

## Slide 9: How the System Works - Sign Detection
- **Step 1:** Capture video feed from webcam using OpenCV.
- **Step 2:** Use MediaPipe to detect hand landmarks (x, y coordinates).
- **Step 3:** Extract keypoints from left and right hands (84 features total).
- **Step 4:** Maintain a sequence of 20 frames for LSTM input.
- **Step 5:** Predict sign using trained LSTM model.
- **Step 6:** Apply threshold and stability checks to avoid false positives.
- **Step 7:** Build sentence by appending detected signs.
- **Step 8:** Emit real-time updates via Socket.IO to frontend.

## Slide 10: How the System Works - Speech Conversion
- **Speech-to-Text:**
  - User records audio via frontend.
  - Send audio file to Flask endpoint.
  - Use Google Speech Recognition API to transcribe.
  - Return text response.
- **Text-to-Speech:**
  - User inputs text.
  - Send text to Flask endpoint.
  - Use pyttsx3 to generate audio.
  - Return audio file for playback.

## Slide 11: Implementation Details - Backend
- **app.py:** Main Flask application with routes for video feed, speech endpoints, and sign/sentence retrieval.
- **camera.py:** Handles video processing, landmark extraction, and model prediction.
- **models/sign_lstm_model_final.h5:** Pre-trained LSTM model for 20 sign classes.
- **socketio_instance.py:** Socket.IO setup for real-time events.
- **utils.py:** Helper functions (if any).

## Slide 12: Implementation Details - Frontend
- **App.js:** Main component with routing using React Router.
- **DetectSign.js:** Component for sign detection with video feed and real-time updates.
- **SpeechToText.js:** Component for speech conversion functionalities.
- **Home.js, About.js, Header.js:** Additional UI components.
- **Styling:** Material-UI for responsive design.

## Slide 13: Dataset and Model Training
- **Dataset:** Custom dataset with hand landmarks for 20 signs (hello, yes, love, etc.).
- **Model:** LSTM network trained on sequences of 20 frames.
- **Training Details:**
  - Input: 84 features (42 per hand)
  - Output: 20 classes
  - Accuracy: [Mention if known, e.g., 85%]
- **Challenges:** Data collection, gesture variations, lighting conditions.

## Slide 14: Demo
- [Live Demo or Screenshots]
  - Show sign detection in action.
  - Demonstrate speech-to-text and text-to-speech.
  - Highlight real-time sentence building.

## Slide 15: Challenges Faced
- **Technical Challenges:**
  - Accurate hand landmark detection in varying conditions.
  - Model prediction stability and cooldown mechanisms.
  - Integrating real-time video processing with web interface.
- **Development Challenges:**
  - Coordinating frontend-backend communication.
  - Handling audio file processing securely.
  - Ensuring cross-browser compatibility.

## Slide 16: Testing and Validation
- **Unit Testing:** Tested individual components (model prediction, API endpoints).
- **Integration Testing:** End-to-end testing of sign detection and speech features.
- **User Testing:** Feedback from potential users for usability improvements.
- **Performance Metrics:** Response time, accuracy rates.

## Slide 17: Future Enhancements
- Expand sign language vocabulary.
- Improve model accuracy with more data.
- Add support for facial expressions and body language.
- Mobile app version.
- Multi-language support.
- Offline capabilities.

## Slide 18: Conclusion
- Successfully developed a real-time sign language communication system.
- Demonstrates integration of computer vision, machine learning, and web technologies.
- Provides a practical solution for deaf-mute communication.
- Opens avenues for further research and development in assistive technologies.

## Slide 19: Q&A
- Thank you for your attention!
- Questions?
