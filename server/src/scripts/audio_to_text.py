import speech_recognition as sr 
import os 
from pydub import AudioSegment
from pydub.silence import split_on_silence
import sys

r = sr.Recognizer()

# def get_large_audio_transcription(path):

path = sys.argv[1]

HOUNDIFY_CLIENT_ID = "dqUQVi0PEoM7AsuO7P8Hnw=="
HOUNDIFY_CLIENT_KEY = "46PHqYnE8icke7M-Zfo61CiipTfpKpqnL5E-rC8oXAcmNZRT6J2WN2jKy3WBfqGZUcEhbO7u8es0l4dg_OB5Jw=="

sound = AudioSegment.from_wav(path)  
chunks = split_on_silence(sound,
    min_silence_len = 55500,
    silence_thresh = sound.dBFS-20,
)

folder_name = "src/audio-chunks"
if not os.path.isdir(folder_name):
    os.mkdir(folder_name)
whole_text = ""

for i, audio_chunk in enumerate(chunks, start=1):
    chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
    audio_chunk.export(chunk_filename, format="wav")

    with sr.AudioFile(chunk_filename) as source:
        audio_listened = r.record(source)
        try:
            text = r.recognize_houndify(audio_listened, client_id=HOUNDIFY_CLIENT_ID, client_key=HOUNDIFY_CLIENT_KEY)
        except sr.UnknownValueError as e:
            print("Error:", str(e))
        else:
            text = f"{text.capitalize()}. "
            # print(chunk_filename, ":", text)
            whole_text += text

    print(whole_text)


# get_large_audio_transcription(sys.argv[1])