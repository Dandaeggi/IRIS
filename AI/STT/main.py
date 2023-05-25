import subprocess
import os
from GoogleSTT import run_stt
import json
import sounddevice as sd
import time
from LoadSetting import load_setting
import json
from FindProgram import get_installed_programs
import psutil
def get_default_input_device_index():
    p = pyaudio.PyAudio()
    default_device_index = p.get_default_input_device_info()["index"]
    p.terminate()
    return default_device_index
load_setting()
run_stt()

# installed_programs = get_installed_programs()
# for program in installed_programs:
#     print(f"{program['name']} - {program['icon_path']}")

import pyaudio
p = pyaudio.PyAudio()

# # print(sd.DeviceList.str())
# def get_devices():
#     info = p.get_host_api_info_by_index(0)
#     numdevices = info.get('deviceCount')
#     for i in range(0, numdevices):
#         if (p.get_device_info_by_host_api_device_index(0, i).get('maxInputChannels')) > 0:
#             print("Input Device id ", i, " - ", p.get_device_info_by_host_api_device_index(0, i).get('name'))
#             print(p.get_device_info_by_host_api_device_index(0, i))
#         elif (p.get_device_info_by_host_api_device_index(0, i).get('maxOutputChannels')) > 0:
#             print("Output Device id ", i, " - ", p.get_device_info_by_host_api_device_index(0, i).get('name'))
#     # return formatted_devices
#
# get_devices()
# print(json.dumps(devices, ensure_ascii=False))