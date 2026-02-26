import cv2 
import numpy as np
import mediapipe as mp 
import tensorflow as tf 
from socketio_instance import socketio


# Load model
model = tf.keras.models.load_model(
    "D:\\fyp_webapp\\backend\\models\\sign_lstm_model_final.h5"
)

actions = ['hello', 'yes','love','okay',"i",'thanks','want','food','water', 'our', 'system' , 'helps', 'real' , 'time' , 'sign' , 'language' , 'communication' ,'for','deaf','mute']

mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

# ==========================
# PARAMETERS 
# ==========================
SEQUENCE_LENGTH = 20
PREDICTION_THRESHOLD = 0.7 
STABLE_FRAMES = 3 
COOLDOWN_FRAMES = 12 

sequence = []
prediction_history = []
current_sign = ""
sentence = []
latest_sentence = ""   #  ADDED (for translation)
cooldown = 0

# Functions to get current sign and sentence
def get_current_sign():
    return current_sign

def get_current_sentence():
    return " ".join(sentence[-5:])


# ==========================
# HAND LANDMARK EXTRACTION
# ==========================
def extract_hands_only(results):
    lh = results.left_hand_landmarks
    rh = results.right_hand_landmarks

    lh_data = np.array([[lm.x, lm.y] for lm in lh.landmark]).flatten() if lh else np.zeros(42)
    rh_data = np.array([[lm.x, lm.y] for lm in rh.landmark]).flatten() if rh else np.zeros(42)

    return np.concatenate([lh_data, rh_data])


# ==========================
# FLASK VIDEO GENERATOR
# ==========================
def gen_frames():
    global cooldown, current_sign, sequence, prediction_history, latest_sentence

    cap = cv2.VideoCapture(0)

    with mp_holistic.Holistic(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5 
    ) as holistic:

        while True:
            success, frame = cap.read()
            if not success:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = holistic.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            # Draw landmarks
            for hand_landmarks in [results.left_hand_landmarks, results.right_hand_landmarks]:
                if hand_landmarks:
                    mp_drawing.draw_landmarks(
                        image,
                        hand_landmarks,
                        mp_holistic.HAND_CONNECTIONS
                    )

            # Extract keypoints
            keypoints = extract_hands_only(results)
            sequence.append(keypoints)
            sequence = sequence[-SEQUENCE_LENGTH:]

            if cooldown > 0:
                cooldown -= 1

            # ==========================
            # PREDICTION
            # ==========================
            # Check if hands are detected
            hands_detected = results.left_hand_landmarks is not None or results.right_hand_landmarks is not None

            if len(sequence) == SEQUENCE_LENGTH and cooldown == 0 and hands_detected:
                res = model.predict(
                    np.expand_dims(sequence, axis=0),
                    verbose=0
                )[0]

                idx = np.argmax(res)
                conf = res[idx]

                if conf > PREDICTION_THRESHOLD:
                    prediction_history.append(idx)
                    prediction_history = prediction_history[-STABLE_FRAMES:]

                    if prediction_history.count(idx) == STABLE_FRAMES:
                        sign = actions[idx]

                        if sign != current_sign:
                            current_sign = sign
                            if not sentence or sign != sentence[-1]:
                                sentence.append(sign)

                            # UPDATE TRANSLATION SENTENCE
                            latest_sentence = " ".join(sentence[-5:])

                            # Emit Socket.IO event
                            socketio.emit('sign_update', {
                                'current_sign': current_sign,
                                'sentence': latest_sentence
                            })

                            cooldown = COOLDOWN_FRAMES
                            prediction_history.clear()



            # ==========================
            # STREAM FRAME
            # ==========================
            ret, buffer = cv2.imencode('.jpg', image)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()
