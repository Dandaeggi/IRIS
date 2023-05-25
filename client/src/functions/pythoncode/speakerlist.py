# f = open("새파일.txt", "w")
# f.close()
# print("sdfdfdsfjksdjfkl12312412")
# a = "sdfjkffdj"
# print("a") 
# -*- coding: utf-8 -*-. 
import pyaudio
import subprocess
import sys
import io

# sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
# sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

# print sys.argv

p = pyaudio.PyAudio()
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf8')
info = p.get_host_api_info_by_index(0)
numdevices = info.get('deviceCount')
devices = []
for i in range(0, numdevices):
        if (p.get_device_info_by_host_api_device_index(0, i).get('maxOutputChannels')) > 0:
            device_info = p.get_device_info_by_host_api_device_index(0, i).get('name')
            # subprocess.Popen(['echo', device_info], stdout=subprocess.PIPE, encoding='utf-8')
            devices.append(device_info)
print(devices)