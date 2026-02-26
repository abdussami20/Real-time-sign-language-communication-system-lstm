import json
import os
from datetime import datetime

predictions_file = 'predictions.json'

def save_prediction(sign, sentence):
    try:
        data = {
            'timestamp': datetime.now().isoformat(),
            'sign': sign,
            'sentence': sentence
        }

        if os.path.exists(predictions_file):
            with open(predictions_file, 'r') as f:
                predictions = json.load(f)
        else:
            predictions = []

        predictions.append(data)

        with open(predictions_file, 'w') as f:
            json.dump(predictions, f, indent=2)
    except Exception as e:
        print(f"Error saving prediction: {e}")
