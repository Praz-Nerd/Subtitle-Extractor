from flask import Flask, request
from flask_cors import CORS
import datetime
from audio import load_audio_from_bytes
from extractor import transcribe

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return str(datetime.datetime.now())

@app.route('/hello')
def hello():
    return f'arg: {request.args.get('user', default='smg')}'

@app.post('/extract')
def extract():
    file = request.files.get('file')
    #audio_bytes = file.read()
    audio = load_audio_from_bytes(file.read())
    print('got encode')
    segments = transcribe(audio)

    return segments

@app.post('/dummy-post')
def dummy():
    return [{'id': 1, 'start': 0, 'end': 10, 'text': 'hello'}, {'id': 2, 'start': 10, 'end': 20, 'text': 'world'}]



if __name__ == '__main__':
    app.run(debug=True)