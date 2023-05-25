import asyncio
import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)
from FindProgram import get_installed_programs
from GoogleSTT import run_stt
# from LoadSetting import load_setting
import aioconsole
import DeviceList
from GoogleSTT import run_stt, change_audio_manager
from CommandProcess import get_audio_index
import pyaudio
import LoadSetting
import sounddevice as sd
import psutil
import GetSpeech

def set_google_application_credentials():
    # Replace 'path/to/your/credentials.json' with the actual path to your JSON key file.
    credentials_path = os.getcwd() + "Credentials File Path"
    # print("asdfasdf",os.getcwd())
    cre_path = os.path.join(os.getcwd(),credentials_path)
    # print("------------------------", cre_path)
    # print("------------------------",os.getcwd()+credentials_path)
    test_path = os.getcwd()+"\\"+credentials_path
    if not os.path.exists(credentials_path):
        # print("The credentials file does not exist. Please provide a valid path.")
        sys.exit(1)
    # print(credentials_path)
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credentials_path

def get_default_input_device_index():
    p = pyaudio.PyAudio()
    default_device_index = p.get_default_input_device_info()["index"]
    p.terminate()
    return default_device_index

def find_running_program(exe_path):
    for process in psutil.process_iter(["name", "exe"]):
        try:
            if process.info["exe"] and process.info["exe"].lower() == exe_path.lower():
                return process
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return None
# p = pyaudio.PyAudio()
# def get_devices():
#     info = p.get_host_api_info_by_index(0)
#     numdevices = info.get('deviceCount')
#     for i in range(0, numdevices):
#         if (p.get_device_info_by_host_api_device_index(0, i).get('maxInputChannels')) > 0:
#             print("Input Device id ", i, " - ", p.get_device_info_by_host_api_device_index(0, i).get('name'))
#             print(p.get_device_info_by_host_api_device_index(0, i))
#         elif (p.get_device_info_by_host_api_device_index(0, i).get('maxOutputChannels')) > 0:
#             print("Output Device id ", i, " - ", p.get_device_info_by_host_api_device_index(0, i).get('name'))
# set_google_application_credentials()
# LoadSetting.load_setting()


# for program in installed_programs:
#     print(f"I0R0I0S5:::{program['name']}:::{program['icon_path']}")
# get_devices()
# test = [{"phrases": ["자비스","발표","이거", "모드","다음","발표","종료","켜줘","실행해줘","실행","꺼줘","카카오톡"]+list(LoadSetting.command_open.keys())}]
# print(test)
# run_stt()

# for program in installed_programs:
#     exe_path = program["icon_path"]
#     running_process = find_running_program(exe_path)
#     if running_process:
#         print(f"{program['name']} is running (PID: {running_process.pid})")
#     else:
#         print(f"{program['name']} is not running")

# # print(sd.DeviceList.str())

    # return formatted_devices
#
# get_devices()
# print(json.dumps(devices, ensure_ascii=False))


async def async_input():
    while True:
        # stdin 감시하고 데이터가 들어오면 처리
        command = await aioconsole.ainput()
        print(command)
        command_tag, command_data = command.split(':::')
        if command_tag == '4S0I0R0I': # 마이크 장치 변환
            change_audio_manager(command_data)
        elif command_tag == '3S0I0R0I': # 스피커 장치 변환
            get_audio_index(command_data)
        elif command_tag == '1S0I0R0I': # 스피커 리스트 반환
            DeviceList.devicelist()
        elif command_tag == '6S0I0R0I':
            LoadSetting.load_setting()
        elif command_tag == '5S0I0R0I':
            installed_programs = get_installed_programs()
            for program in installed_programs:
                print(f":::I0R0I0S5:::{program['name']}:::{program['icon_path']}")
                sys.stdout.flush()



def func():
    set_google_application_credentials()
    LoadSetting.load_setting()
    # installed_programs = get_installed_programs()
    # print(installed_programs)
    # for program in installed_programs:
        # print(f"I0R0I0S5:::{program['name']}:::{program['icon_path']}")
    run_stt()

async def main():
    loop = asyncio.get_running_loop()
    # try:
    await asyncio.gather(loop.run_in_executor(None, func), async_input())
    # except Exception as e:
        # print(f"main() 함수에서 예외 발생: {e}")

if __name__ == "__main__":
    asyncio.run(main())