import pyaudio
import json
p = pyaudio.PyAudio()

def devicelist():
    info = p.get_host_api_info_by_index(0)
    numdevices = info.get('deviceCount')
    speakers = []
    mikes = []
    print("enter devicelist")
    for i in range(0, numdevices):
            device = p.get_device_info_by_host_api_device_index(0, i)
            if (device.get('maxOutputChannels')) > 0:
                device_info = device.get('name')
                speakers.append(device_info)
            if (device.get('maxInputChannels')) > 0:
                device_info = device.get('name')
                mikes.append(device_info)

    device_to_json = {
        "tag": "I0R0I0S1",
        "mike": mikes,
        "speaker": speakers,
    }
    json_string = json.dumps(device_to_json)
    print(json_string)