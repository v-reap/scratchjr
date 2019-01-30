import os
import glob
from pydub import AudioSegment

video_dir = './'  # Path where the videos are located
extension_list = ('*.mp3') # ('*.mp4', '*.flv')

os.chdir(video_dir)
for extension in extension_list:
    for video in glob.glob(extension):
        if (os.path.splitext(os.path.basename(video))[1]=='.mp3'):
            mp3_filename = os.path.splitext(os.path.basename(video))[0] + '.mp3'
            print(mp3_filename)
            AudioSegment.from_file(video).export(mp3_filename, format='mp3')
