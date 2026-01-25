def getTime(seconds):
    m, s = divmod(seconds, 60)
    h, m = divmod(m, 60)
    return int(h), int(m), s

def formatSrtTime(seconds):
    h, m, s = getTime(seconds)
    hStr = str(h).rjust(2, '0')
    mStr = str(m).rjust(2, '0')
    sStr = str(int(s)).rjust(2, '0')
    msStr = str(s-int(s))[2:5].ljust(3, '0')
    return f'{hStr}:{mStr}:{sStr},{msStr}'

def writeSrt(transcription, filename, padding=0.1):
    with open(filename, 'w') as f:
        for segment in transcription:
            f.write(f'{segment['id']}\n{formatSrtTime(segment['start'])} --> {formatSrtTime(segment['end']+padding)}\n{segment['text'].strip()}\n\n')
    print(f'{filename} created')

def writeSrtString(transcription, padding=0.1):
    result = ''
    for segment in transcription:
        result += f'{segment['id']}\n{formatSrtTime(segment['start'])} --> {formatSrtTime(segment['end']+padding)}\n{segment['text'].strip()}\n\n'
    
    return result

def getTranscriptDict(transcription, padding=0.1):
    result = []
    for segment in transcription:
        result.append({
            'id':segment['id'],
            'start': round(segment['start'], 2),
            'end': round(segment['end']+padding, 2),
            'text':segment['text'].strip()
        })
    return result
    