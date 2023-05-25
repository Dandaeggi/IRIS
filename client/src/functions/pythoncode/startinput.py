import pyaudio
import struct
import time
import math

FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
CHUNK = 1024

p = pyaudio.PyAudio()

stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)

while True:
    data = stream.read(CHUNK)
    data_int = [int(x) for x in data]
    rms = math.sqrt(sum([x**2 for x in data_int])/len(data_int))
    print(rms-150)
    time.sleep(0.1)

# import pyaudio
# import numpy as np
# import time
# import struct
# import librosa

# # 오디오 스트림을 엽니다.
# audio = pyaudio.PyAudio()

# # 오디오 입력 장치를 선택합니다.
# stream = audio.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=1024)

# # 오디오 데이터를 저장할 리스트를 생성합니다.
# frames = []

# # 오디오 데이터를 읽어서 리스트에 저장합니다.
# while True:
#     data = stream.read(1024)
#     data_int = struct.unpack(str(2*1024) + 'B', data)
#     frames.append(data_int)
#     y, sr = librosa.load(data_int)
#     print(frames)
#     # print(1)
#     # data = np.frombuffer(stream.read(1024),dtype=np.int16)
#     # frames.append(list(data))
#     # print(frames[0])
#     time.sleep(0.1)
#     frames = []
#     # Ctrl+C를 눌러서 루프를 종료할 수 있습니다.
#     # 다른 조건에 따라 루프를 종료할 수도 있습니다.
#     # 이 예제에서는 무한 루프를 사용합니다.
# 오디오 스트림을 닫습니다.
# stream.stop_stream()
# stream.close()
# audio.terminate()