import speech_recognition as sr 
import os 
from pydub import AudioSegment
from pydub.silence import split_on_silence
import sys
from constants import HOUNDIFY_CLIENT_ID, HOUNDIFY_CLIENT_KEY

path = sys.argv[1]

r = sr.Recognizer()

sound = AudioSegment.from_wav(path)  
chunks = split_on_silence(sound,
    min_silence_len = 55500,
    silence_thresh = sound.dBFS-20,
)

FOLDER_NAME = 'src/audio-chunks'

if not os.path.isdir(FOLDER_NAME):
    os.mkdir(FOLDER_NAME)
whole_text = ''

for i, audio_chunk in enumerate(chunks, start=1):
    chunk_filename = os.path.join(FOLDER_NAME, f'chunk{i}.wav')
    audio_chunk.export(chunk_filename, format='wav')

    with sr.AudioFile(chunk_filename) as source:
        audio_listened = r.record(source)
        try:
            text = r.recognize_houndify(audio_listened, client_id=HOUNDIFY_CLIENT_ID, client_key=HOUNDIFY_CLIENT_KEY)
        except sr.UnknownValueError as e:
            print('Error:', str(e))
        else:
            text = f'{text.capitalize()}. '
            whole_text += text

    print(whole_text)