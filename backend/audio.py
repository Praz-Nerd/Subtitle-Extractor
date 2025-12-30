import ffmpeg
import numpy as np

def load_audio_from_bytes(data: bytes, sr=16000):
    out, _ = (
        ffmpeg
        .input('pipe:0')
        .output(
            'pipe:1',
            format='f32le',
            acodec='pcm_f32le',
            ac=1,
            ar=sr
        )
        .run(input=data, capture_stdout=True, capture_stderr=True)
    )

    return np.frombuffer(out, np.float32)
