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
    print('work')
    model = request.args.get('model', default='base')
    file = request.files.get('file')
    #audio_bytes = file.read()
    audio = load_audio_from_bytes(file.read())
    print('got encode')
    srt = transcribe(audio)

    return srt

@app.post('/dummy-post')
def dummy():
    return {'response':'SWR works...', 'date':datetime.datetime.now()}



if __name__ == '__main__':
    app.run(debug=True)