import whisper_timestamped as whisper
from srt_formatter import writeSrtString, getTranscriptDict

model = whisper.load_model('base')
def transcribe(audio, language='en', vad=True):
    result = whisper.transcribe(model, audio, language=language, vad=vad)
    return getTranscriptDict(result['segments'], padding=0.08)

# audio = whisper.load_audio('henry.mp4')
# model = whisper.load_model('base')

# result = whisper.transcribe(model, audio, language='en', vad=True)

# writeSrt(result['segments'], 'henry.srt', padding=0.08)
