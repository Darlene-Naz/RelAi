import moviepy.editor
import sys

path = sys.argv[1]

video = moviepy.editor.VideoFileClip(path)
audio = video.audio

audio.write_audiofile('src/uploads/upload.wav')

print('Converted video to audio successfully!')