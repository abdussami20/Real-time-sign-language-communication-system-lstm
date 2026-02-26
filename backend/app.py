from flask import Flask, Response
from flask_cors import CORS
from socketio_instance import socketio
from camera import gen_frames

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend
socketio.init_app(app, cors_allowed_origins="*")

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


# --- SPEECH TO TEXT ENDPOINT ---
import speech_recognition as sr
import tempfile
from flask import request, jsonify, send_file
import pyttsx3
import io
from camera import get_current_sign, get_current_sentence

@app.route('/speech_to_text', methods=['POST'])
def speech_to_text():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
    audio_file = request.files['audio']
    recognizer = sr.Recognizer()
    with tempfile.NamedTemporaryFile(delete=True, suffix='.wav') as temp_audio:
        audio_file.save(temp_audio.name)
        with sr.AudioFile(temp_audio.name) as source:
            audio_data = recognizer.record(source)
            try:
                text = recognizer.recognize_google(audio_data)
                return jsonify({'text': text})
            except Exception as e:
                return jsonify({'error': str(e)})

# --- TEXT TO SPEECH ENDPOINT ---
@app.route('/text_to_speech', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    engine = pyttsx3.init()
    with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_audio:
        engine.save_to_file(text, temp_audio.name)
        engine.runAndWait()
        temp_audio.seek(0)
        audio_bytes = temp_audio.read()
    return send_file(
        io.BytesIO(audio_bytes),
        mimetype='audio/wav',
        as_attachment=False,
        download_name='speech.wav'
    )

# --- GET SIGN AND SENTENCE ENDPOINT ---
@app.route('/get_sign_sentence')
def get_sign_sentence():
    return jsonify({
        'current_sign': get_current_sign(),
        'current_sentence': get_current_sentence()
    })

if __name__ == "__main__":
    socketio.run(app, debug=True)

    