from ctypes import cast, POINTER, wintypes

from selenium.common import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume, IMMDeviceEnumerator
from datetime import datetime
from PIL import Image
import re
import pygetwindow as gw
import requests
import sys
import json
import base64
import io
# sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'TTS'))
# from irisTTS import iris_TTS
import numpy as np
import webbrowser
import pyaudio
# import pyttsx3
import subprocess
import ctypes
import psutil
import os
import signal
import LoadSetting
import pyautogui
# import win32con
import win32gui
import win32process
import win32ui
from comtypes import CLSCTX_ALL
from selenium.webdriver.common.keys import Keys
import GetSpeech
'''
COMMAND_STATE = 0 ( 인공지능 호출 대기 )
COMMAND_STATE = 1 ( 일반 명령어 모드 )
COMMAND_STATE = 2 ( PPT 모드 )
COMMAND_STATE = 3 ( 유튜브 모드 )
COMMAND_STATE = 4 ( 개발자 모드 )
'''
COMMAND_STATE = 0

text = "여기에 변환하려는 텍스트를 입력하세요."

base_dir = os.path.join(os.path.expanduser('~'), 'Documents', 'iris')
now = datetime.now()
date_dir = now.strftime('%Y-%m-%d')  # 오늘 날짜 폴더
save_dir = os.path.join(base_dir, date_dir)  # 저장할 디렉토리 경로
search_keywords = ["검색","찾아"]

EnumWindows = ctypes.windll.user32.EnumWindows
EnumWindowsProc = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)

GetWindowText = ctypes.windll.user32.GetWindowTextW
GetWindowTextLength = ctypes.windll.user32.GetWindowTextLengthW
IsWindowVisible = ctypes.windll.user32.IsWindowVisible

output_device_index = 0

SendInput = ctypes.windll.user32.SendInput
ULONG_PTR = wintypes.WPARAM

driver = ''

def start_stream(data):
    global output_device_index
    p = pyaudio.PyAudio()
    chunk_size = 1024
    stream = p.open(format=pyaudio.paFloat32,
                    channels=1,
                    rate=22400,
                    output=True)

    try:
        if output_device_index != 0:
            stream.stop_stream()
            stream.close()
            stream = p.open(format=pyaudio.paFloat32,
                            channels=1,
                            rate=22400,
                            output=True,
                            output_device_index=output_device_index)
    except Exception as e:
        print("An error occurred open the audio stream: {}".format(str(e)))

    try:
        stream.write(data.tobytes())
        stream.stop_stream()
        stream.close()
    except Exception as e:
        print("An error occurred write audio data to the stream: {}".format(str(e)))


def get_audio_index(audio_device_name):
    global output_device_index,driver
    p = pyaudio.PyAudio()
    info = p.get_host_api_info_by_index(0)
    num_devices = info.get('deviceCount')
    for i in range(0, num_devices):
        device_info = p.get_device_info_by_host_api_device_index(0, i)
        if (device_info.get('name') == audio_device_name):
            output_device_index = i

            device_info = p.get_device_info_by_index(i)
            num_channels = device_info.get('maxInputChannels')
            print("CHANNELS : ", num_channels)

            return i


def play_audio_data(text):
    response = requests.post(url, json={"text": text})

    if response.status_code == 200:
        response_dict = json.loads(response.content)
        compressed_data = base64.b64decode(response_dict['wav'].encode('utf-8'))
        buffer = io.BytesIO(compressed_data)
        loaded_data = np.load(buffer)
        data = loaded_data['array_data']
    else:
        return

    start_stream(data)


# def play_audio_data(text):
#     response = requests.post(url, json={"text": text})
#     # print(response.status_code)
#
#     if response.status_code == 200:
#         response_dict = json.loads(response.content)
#         compressed_data = base64.b64decode(response_dict['wav'].encode('utf-8'))
#         # print(compressed_data)
#         buffer = io.BytesIO(compressed_data)
#         loaded_data = np.load(buffer)
#         data = loaded_data['array_data']
#     else :
#         return
#     # Create a PyAudio object
#     p = pyaudio.PyAudio()
#     chunk_size = 1024
#     # Open a streaming stream
#     stream = p.open(format=pyaudio.paFloat32,
#                     channels=1,
#                     rate=22400,
#                     output=True)
#     # for i in range(0, len(data), chunk_size):
#     #     chunk = data[i:i+chunk_size]
#     stream.write(data.tobytes())
#         # time.sleep(chunk_size / sample_rate)
#     # Play the audio data
#
#
#     # Stop the stream
#     stream.stop_stream()
#     stream.close()

def screenshot(pid=None):
    save_dir = "screenshots"

    if not os.path.exists(save_dir):  # 디렉토리가 없으면 생성
        os.makedirs(save_dir)

    # 저장할 파일 이름 생성
    files = os.listdir(save_dir)
    if not files:
        idx = 1
    else:
        last_file = sorted(files)[-1]
        idx = int(os.path.splitext(last_file)[0]) + 1
    filename = f'{idx}.png'
    save_path = os.path.join(save_dir, filename)

    # 스크린샷 찍기
    if pid is not None:  # PID가 입력된 경우 해당 프로세스 캡쳐
        hwnd_list = get_hwnd_by_pid(pid)
        if hwnd_list:
            for hwnd in hwnd_list:
                left, top, right, bottom = win32gui.GetWindowRect(hwnd)
                width = right - left
                height = bottom - top
                hwnd_dc = win32gui.GetWindowDC(hwnd)
                mfc_dc = win32ui.CreateDCFromHandle(hwnd_dc)
                save_dc = mfc_dc.CreateCompatibleDC()
                save_bitmap = win32ui.CreateBitmap()
                save_bitmap.CreateCompatibleBitmap(mfc_dc, width, height)
                save_dc.SelectObject(save_bitmap)
                win32gui.BitBlt(save_dc.GetSafeHdc(), 0, 0, width, height, hwnd_dc, 0, 0, 13369376)
                bmpinfo = save_bitmap.GetInfo()
                bmpstr = save_bitmap.GetBitmapBits(True)
                image = Image.frombuffer('RGB', (bmpinfo['bmWidth'], bmpinfo['bmHeight']), bmpstr, 'raw', 'BGRX', 0, 1)
                image.save(save_path)
                win32gui.DeleteObject(save_bitmap.GetHandle())
                save_dc.DeleteDC()
                mfc_dc.DeleteDC()
                win32gui.ReleaseDC(hwnd, hwnd_dc)
                break
        else:
            raise ValueError(f'PID {pid}에 해당하는 윈도우를 찾을 수 없습니다.')
    else:  # PID가 입력되지 않은 경우 전체화면 캡쳐
        image = pyautogui.screenshot()

    # 이미지 저장
    image.save(save_path)
    play_audio_data("스크린샷을 완료했어요")
    # print(f'스크린샷 저장 완료: {save_path}')

    # # 현재 화면 스크린샷 찍기
    # image = ImageGrab.grab()
    #
    # # 이미지 저장
    # print("스크린샷 실행")
    # image.save('screenshot.png')


def run_command(commands):
    global COMMAND_STATE,driver
    # print(LoadSetting.iris_name)
    # print(LoadSetting.command_open)
    #######################################################이리스 부르기##########################################################################
    if 'volum' in commands and COMMAND_STATE!=0:
        index = commands.index('volum')
        value = None

        # 볼륨 커맨드 다음 인덱스에 숫자가 있는지 확인
        for i in range(index + 1, len(commands)):
            if commands[i].isdigit():
                value = int(commands[i])
                break

        if 'down' in commands:
            adjust_volume(value, 'down')
        elif 'up' in commands:
            adjust_volume(value, 'up')

        # value = int(commands[index + 1])
        # direction = commands[index + 2]
        # if 'down' in commands or 'up' in commands:
        #     adjust_volume(value, direction)
        # # print("end+\n")
        # # sys.stdout.flush()
    if LoadSetting.iris_name in commands:
        COMMAND_STATE = 1
        play_audio_data("네 말씀해주세요")
    #######################################################프로그램 실행, 종료 모드#############################################################
    elif COMMAND_STATE == 1:
        for command in commands:
            if command in list(LoadSetting.combine_list.keys()):
                play_audio_data(command + "를 실행할게요.")
                for open_target in LoadSetting.combine_list[command]['open']:
                    try:
                        try:
                            os.startfile(open_target[1])
                        except:
                            try:
                                if ("explorer" in open_target[1]):
                                    url = open_target[1].replace("explorer ", "")
                                    if driver=='':
                                        driver = webdriver.Chrome(ChromeDriverManager().install())
                                        driver.get(url)
                                    else :
                                        driver.execute_script(f"window.open('{url}', '_blank');")
                                else:
                                    os.startfile(LoadSetting.custom_open.get(command))
                            except:
                                play_audio_data(open_target[0] + "프로그램이 없어요.")
                    except:
                        pass
        if 'start' in commands :
            for command in commands :
                if command in LoadSetting.command_open:
                    # print("기본 명령어 집합으로 들어옴")
                    try:
                        if "explorer" in LoadSetting.command_open.get(command):
                            # print("이곳은 url임")
                            url = LoadSetting.command_open.get(command).replace("explorer ", "")
                            if driver == '':
                                webdriver.Chrome(ChromeDriverManager().install())
                                driver.get(url)
                            else:
                                driver.execute_script("window.open(", url, ")")
                        else:
                            # print(" 프로그램 실행이 되어야 함 .")
                            os.startfile(LoadSetting.command_open.get(command))
                        play_audio_data(command + "를 실행할게요.")
                    except:
                        play_audio_data(command + "프로그램이 없어요.")

                elif command in LoadSetting.custom_open:
                    try:
                        if("explorer" in LoadSetting.custom_open.get(command)):
                            # print("exeplorer 감지 됨")
                            url = LoadSetting.custom_open.get(command).replace("explorer ","")
                            # webbrowser.open(url)
                            if driver == '':
                                # print("웹드라이버 생성")
                                # print(url)
                                driver = webdriver.Chrome(ChromeDriverManager().install())
                                driver.get(url)
                            else:
                                # print("웹드라이버 생성 안함")
                                # print(url)
                                # print("window.open(", url, ")")
                                # driver.execute_script("window.open('",url,"')")
                                driver.execute_script(f"window.open('{url}', '_blank');")
                        else:
                            os.startfile(LoadSetting.custom_open.get(command))
                        play_audio_data(command + "를 실행할게요.")
                    except:
                        play_audio_data(command + "프로그램이 없어요.")
        elif 'exit' in commands :
            if '이거' in commands and len(commands):
                user32 = ctypes.windll.user32
                # 현재 보이는 창의 핸들 가져오기
                hwnd = user32.GetForegroundWindow()
                # 프로세스 ID 가져오기
                pid = ctypes.c_ulong()
                user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
                os.kill(pid.value, signal.SIGTERM)
                play_audio_data("보고 계신 창을 종료할게요.")
            else :
                for command in commands:
                    # print(command)
                    if command in LoadSetting.command_open:
                        exe_path = LoadSetting.command_open.get(command)
                        print(command)
                        if ("explorer" in LoadSetting.command_open.get(command)):
                            all_tabs = driver.window_handles
                            # print(all_tabs)
                            # 특정 탭을 찾기 위해 탭 핸들을 순회합니다.
                            for tab in all_tabs:
                                driver.switch_to.window(tab)
                                # 현재 탭의 URL을 확인하여 특정 탭을 찾습니다.
                                if "explorer "+driver.current_url == LoadSetting.command_open.get(command):
                                    # print("탭을 찾았습니다!")
                                    driver.close()
                                    # 여기에서 원하는 작업을 수행합니다.
                        else:
                            # exe_path = program["icon_path"]
                            running_process = find_running_program(exe_path)
                            if running_process:
                                # print(f"is running (PID: {running_process.pid})")
                                os.kill(running_process.pid, signal.SIGTERM)
                                play_audio_data(command+"를 종료할게요.")
                            else:
                                play_audio_data("프로그램이 실행중이 아니에요.")
                                # print(f" is not running")

                    if command in LoadSetting.custom_open:
                        exe_path = LoadSetting.custom_open.get(command)
                        # print(command)
                        if ("explorer" in LoadSetting.custom_open.get(command)):
                            all_tabs = driver.window_handles
                            # print(all_tabs)
                            # 특정 탭을 찾기 위해 탭 핸들을 순회합니다.
                            for tab in all_tabs:
                                driver.switch_to.window(tab)
                                # print(driver.current_url)
                                # print(LoadSetting.custom_open.get(command))
                                # 현재 탭의 URL을 확인하여 특정 탭을 찾습니다.
                                # print("explorer "+driver.current_url.replace("http://","").replace("https://","").replace("www.",""))
                                if "explorer "+driver.current_url.replace("http://","").replace("https://","").replace("www.","") == \
                                        LoadSetting.custom_open.get(command).replace("http://","").replace("https://","").replace("www.",""):
                                    # print("탭을 찾았습니다!")
                                    tab.close()
                                    break
                                    # 여기에서 원하는 작업을 수행합니다.
                        else:
                            # exe_path = program["icon_path"]
                            running_process = find_running_program(exe_path)
                            if running_process:
                                # print(f"is running (PID: {running_process.pid})")
                                os.kill(running_process.pid, signal.SIGTERM)
                                # print("end+\n")
                                # sys.stdout.flush()
                                play_audio_data(command+"를 종료할게요.")
                            else:
                                play_audio_data("프로그램이 실행중이 아니에요.")
                                # print(f" is not running")
        elif 'search' in commands :
            # print("들어옴 ?")
            for keyword in search_keywords:
                if keyword in commands[0]:
                    search_keyword = commands[0].split(keyword)[0].strip()
                    break
            else:
                search_keyword = commands[0].strip()
            # print(search_keyword)
            search_result = "https://google.com/search?q="+search_keyword;
            # print(search_result)
            webbrowser.open(search_result)
            # print("end+\n")
            # sys.stdout.flush()
            play_audio_data("네 검색해드릴게요.")

        elif 'capture' in commands:
            # if '이거' in commands:
            #     print("해당 부분만 캡쳐해야함")
            # else:
            for command in commands:
                if command in LoadSetting.command_open:
                    exe_path = LoadSetting.command_open.get(command)
                    # exe_path = program["icon_path"]
                    running_process = find_running_program(exe_path)
                    if running_process:
                        # print("end+\n")
                        # sys.stdout.flush()
                        play_audio_data(command+"를 캡쳐할게요.")
                        # print(f"is running (PID: {running_process.pid})")
                        screenshot(running_process.pid)
                    else:
                        play_audio_data(command + "가 실행중이 아니에요.")
                        # print(f" is not running")
        elif 'weather' in commands:
            # user_input = "서울특별시 날씨 알려줘"
            user_input = commands[0]
            # print(user_input)
            level1,level2,level3 = extract_location_info(user_input)
            # print("level1 : ","" if level1==None else level1)
            # print("level2 : ","" if level2==None else level2)
            # print("level3 : ","" if level3==None else level3)
            response = requests.get(weather_url, json={
                "level1": "" if level1 == None else level1,
                "level2": "" if level2 == None else level2,
                "level3": "" if level3 == None else level3,
            })
            response_str = response.content.decode('utf-8')
            response_json = json.loads(response_str)
            loc_X = response_json["locX"]
            loc_Y = response_json["locY"]
            # print("loc_X : ",loc_X)
            # print("loc_Y : ",loc_Y)
            if (loc_X != "요청이 잘못되었거나 없는 데이터" and loc_X != None) and (loc_Y != "요청이 잘못되었거나 없는 데이터" and loc_Y != None):
                weather_api = "API Key"
                weather_json = get_weather_kma("API Key",loc_X,loc_Y)
                items = weather_json['response']['body']['items']['item']
                weather_data = {}
                for item in items:
                    category = item['category']
                    value = item['obsrValue']
                    weather_data[category] = value
                temperature = float(weather_data['T1H'])
                humidity = int(weather_data['REH'])
                precipitation_type = int(weather_data['PTY'])
                precipitation_1h = float(weather_data['RN1'])
                wind_speed = float(weather_data['WSD'])
                weather_text = trans_weather(precipitation_type,temperature,humidity)
                # print(weather_text)
                play_audio_data(weather_text)
            else:
                play_audio_data("지역 정보를 찾지 못했어요.")

            # trans_weather(wether_text)
        elif 'youtube' in commands and 'mode' in commands:
            play_audio_data("유튜브 모드로 전환할게요.")
            if driver == '':
                driver = webdriver.Chrome(ChromeDriverManager().install())
                driver.get("https://youtube.com")
            else:
                driver.execute_script(f"window.open('https://youtube.com', '_blank');")
            # print("asdfasdfasdfasdfasdfasdfasdf")
            COMMAND_STATE=3
        elif '발표' in commands and 'mode' in commands:
            COMMAND_STATE=2
            play_audio_data("발표 모드로 전환할게요.")
        else:
            play_audio_data("다시 한번 말씀해주세요.")
        if COMMAND_STATE != 3 and COMMAND_STATE != 2:
            COMMAND_STATE=4

    elif COMMAND_STATE == 3:
        # if 'prev' in commands :
        #     pyautogui.hotkey('shift', 'p')
        #     # print("이전 동영상")
        # elif 'next' in commands :
        #     pyautogui.hotkey('shift', 'n')
        #     # print('다음 동영상')
        # elif 'back' in commands:
        #     # pyautogui.press('j')
        #     adjust_video_time(commands,'j')
        #     # print("10초 뒤로")
        # elif 'go' in commands:
        #     adjust_video_time(commands,'l')
        #     # pyautogui.press('l')
        #     # print("10초 앞으로")
        # elif '전체' in commands and '화면' in commands:
        #     pyautogui.press('f')
        #     # print("전체 화면")
        # elif 'stop' in commands:
        #     pyautogui.press('k')
        #     # print("일시 정지")
        # elif 'skip' in commands:
        #     # print("여기로는 들어옴 ?")
        #     original_position = pyautogui.position()
        #     skip_center = pyautogui.locateCenterOnScreen('skip.png',confidence=0.7)
        #     # print(int(skip_center[0]))
        #     # print(int(skip_center[1]))
        #     pyautogui.click(skip_center)
        #     pyautogui.moveTo(original_position)
        if 'prev' in commands:
            previous_video(driver)
        elif 'next' in commands:
            next_video(driver)
        elif 'back' in commands:
            time_info = parse_time_command(commands[-1])
            if time_info:
                minutes, seconds = time_info
                total_seconds = minutes * 60 + seconds
                seek_video(driver, -total_seconds)
        elif 'go' in commands:
            time_info = parse_time_command(commands[-1])
            if time_info:
                minutes, seconds = time_info
                total_seconds = minutes * 60 + seconds
                seek_video(driver, total_seconds)
        elif '전체' in commands and '화면' in commands:
            toggle_fullscreen(driver)
        elif 'stop' in commands:
            play_pause_video(driver)
        elif 'skip' in commands:
            # 현재로서는 Selenium에서 이미지 인식 기능이 없습니다. 이 부분은 처리할 수 없습니다.
            skip_ad(driver)
        elif 'move' in commands:
            text = commands[-1]
            time_tuple = parse_time_command(text)
            if time_tuple and driver!="":
                set_video_time(driver, time_tuple[0],time_tuple[1])

        elif 'youtube' in commands and 'mode' in commands and 'exit' in commands:
            play_audio_data("유튜브 모드를 종료할게요")
            driver = ""
            COMMAND_STATE=0
        elif 'search' in commands :
            search_keyword = commands[0]
            # print(search_keyword)
            search_keyword = parse_search_query(search_keyword)
            # print(search_keyword)
            search_box = driver.find_element("css selector", "input#search")
            search_box.clear()
            search_box.send_keys(search_keyword)
            search_box.send_keys(Keys.RETURN)
        elif 'start' in commands :
            # print("test : ",commands[-1])
            # print(parse_video_number(commands[-1]))
            video_number = parse_video_number(commands[-1])
            if video_number is not None and driver!="":
                play_video(video_number, driver)
        # elif 'volum' in commands and 'down' in commands:
        #     pyautogui.press('volumedown')
        #     print("볼륨 다운")
    ##########################################################파워포인트 모드#################################################################

    elif COMMAND_STATE == 2:
        if '전체' in commands and '화면' in commands and 'exit' in commands:
            # print("test")
            pyautogui.press('esc')
            # engine.say("전체화면을 종료할게요.")
            # engine.runAndWait()
        elif '전체' in commands and '화면' in commands:
            pyautogui.press('F5')
            # engine.say("전체화면으로 전환할게요.")
            # engine.runAndWait()
        elif '다음' in commands:
            pyautogui.press('right')
        elif '발표' in commands and 'exit' in commands:
            # print("발표를 종료할게요.")
            play_audio_data("발표 모드를 종료할게요.")
            COMMAND_STATE = 0
            # engine.runAndWait()
    # print("COMMAND : ",COMMAND_STATE)
    if COMMAND_STATE == 4:
        COMMAND_STATE = 0
    if COMMAND_STATE != 1:
        print("end+\n")
        sys.stdout.flush()

def run_git_command(command):
    if not is_git_installed():
        # print("Git이 설치되어 있지 않습니다.")
        # answer = input("Git을 설치하겠습니까? (y/n): ")
        # if answer.lower() == "y":
        webbrowser.open("https://git-scm.com/downloads")
        # else:
        #     print("Git이 설치되어 있지 않아 명령을 수행할 수 없습니다.")
        # return
    subprocess.run(command.split())

def is_git_installed():
    try:
        subprocess.run(["git", "--version"], check=True)
        return True
    except FileNotFoundError:
        return False

def find_running_program(exe_path):
    for process in psutil.process_iter(["name", "exe"]):
        try:
            if process.info["exe"] and process.info["exe"].lower() == exe_path.lower():
                return process
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return None

def get_hwnd_by_pid(pid):
    hwnd_list = []

    def callback(hwnd, lparam):
        _, process_id = win32process.GetWindowThreadProcessId(hwnd)
        if process_id == pid:
            hwnd_list.append(hwnd)
        return True

    EnumWindowsProc = ctypes.WINFUNCTYPE(ctypes.c_bool, ctypes.c_int, ctypes.POINTER(ctypes.c_int))
    win32gui.EnumWindows(EnumWindowsProc(callback), ctypes.pointer(ctypes.c_int()))

    return hwnd_list

def get_weather_kma(api_key, nx, ny):
    now = datetime.now()

    # 날짜와 시간을 원하는 형식으로 변환
    date_str = now.strftime('%Y%m%d')
    current_hour = now.hour

    # 현재 분(minute) 부분만 추출합니다.
    current_minute = now.minute

    # 만약 현재 분이 40분 이전이라면, base_time을 그 전 시각으로 설정합니다.
    if current_minute < 40:
        current_hour -= 1

    # 시간별 base_time 설정 (HHMM 형식)
    time_str = f"{current_hour:02d}00"

    # print(f"Current date: {date_str}")
    # print(f"Current time: {time_str}")
    nx = int(float(nx))
    ny = int(float(ny))
    # print(nx)
    # print(ny)
    url = f"http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey={api_key}&numOfRows=10&pageNo=1&base_date={date_str}&base_time={time_str}&nx={nx}&ny={ny}&dataType=JSON"

    response = requests.get(url)
    weather_data = response.json()
    # print(weather_data)
    return weather_data

def trans_weather(precipitation_type,temperature,humidity):
    if precipitation_type == 0:
        if temperature < 0:
            if humidity < 40:
                weather_sentence = f"현재 맑은 하늘이지만 기온이 {temperature}도로 영하이고, 습도는 {humidity}%로 건조한 상태입니다. 추운 날씨와 건조함에 유의하며 따뜻한 옷차림을 잊지 마세요."
            else:
                weather_sentence = f"현재 맑은 하늘이지만 기온이 {temperature}도로 영하입니다. 추운 날씨이니 따뜻한 옷차림을 잊지 마세요."
        elif temperature < 10:
            if humidity < 40:
                weather_sentence = f"오늘은 맑은 날씨에 기온은 {temperature}도로 쌀쌀하고, 습도는 {humidity}%로 건조합니다. 외투와 습기를 보충할 수 있는 아이템을 챙겨 외출하시기 바랍니다."
            else:
                weather_sentence = f"오늘은 맑은 날씨에 기온은 {temperature}도로 쌀쌀합니다. 외투를 입고 외출하시기 바랍니다."
        elif temperature < 20:
            if humidity < 40:
                weather_sentence = f"현재 맑은 날씨로 기온이 {temperature}도이고, 습도는 {humidity}%로 건조한 상태입니다. 딱 적당한 온도로 외출하기 좋은 날씨네요. 건조한 날씨에 유의하세요."
            else:
                weather_sentence = f"현재 맑은 날씨로 기온이 {temperature}도입니다. 딱 적당한 온도로 외출하기 좋은 날씨네요."
        else:
            if humidity < 40:
                weather_sentence = f"오늘은 맑고 더운 날씨로 기온이 {temperature}도이며, 습도는 {humidity}%로 건조한 상태입니다. 시원한 음료와 함께 건조함을 주의하세요."
            else:
                weather_sentence = f"오늘은 맑고 더운 날씨로 기온이 {temperature}도입니다. 시원한 음료와 함께 열대야를 대비하세요."
    elif precipitation_type == 1:
        weather_sentence = f"비가 내리는 날씨로 기온은 {temperature}도이고, 습도는 {humidity}%입니다. 우산을 꼭 챙기시고 빗길 운전에 주의하세요."
    elif precipitation_type == 2:
        weather_sentence = f"진눈깨비가 내리는 날씨에 기온은 {temperature}도이고, 습도는 {humidity}%입니다. 미끄러운 도로와 보행에 유의하시고 따뜻한 옷차림을 잊지 마세요."
    elif precipitation_type == 3:
        weather_sentence = f"눈이 내리는 날씨로 기온은 {temperature}도이고, 습도는 {humidity}%입니다. 눈길 운전과 보행에 주의하시고 따뜻한 옷차림을 잊지 마세요."
    elif precipitation_type == 4:
        weather_sentence = f"소나기가 내리는 날씨에 기온은 {temperature}도이고, 습도는 {humidity}%입니다. 갑작스러운 비에 대비하여 우산을 챙기시고 빗길 운전에 주의하세요."
    else:
        weather_sentence = f"현재 기온은 {temperature}도이고, 습도는 {humidity}%입니다. 날씨에 맞는 옷차림과 준비를 잊지 마세요."
    return weather_sentence

def extract_location_info(text):
    pattern = re.compile(r"((?:\w+특별시|\w+광역시|\w+도|\w+시)|)(?:\s+|)((?:\w+구|\w+시|\w+군)|)(?:\s+|)((?:\w+동|\w+읍|\w+면)|)")
    match = pattern.search(text)

    if match:
        level1, level2, level3 = match.groups()
        return level1.strip() or None, level2.strip() or None, level3.strip() or None
    else:
        return None, None, None

def adjust_volume(value, direction):
    if value is None:
        value = 2  # 기본값 설정
    num_changes = value // 2  # 1단계볼륨 조절은 대략 2%이므로 나누기 2를 합니다.
    for _ in range(num_changes):
        pyautogui.press(f'volume{direction}')

def adjust_video_time(commands, direction):
    time_amount = None
    time_unit = None

    # 시간 단위 및 수량 찾기
    for command in commands:
        if command.isdigit():
            time_amount = int(command)
        elif command in ('초', '분'):
            time_unit = command

    # 시간 단위가 주어진 경우
    if time_amount is not None and time_unit is not None:
        if time_unit == '분':
            time_amount *= 60

        num_presses = time_amount // 10
        for _ in range(num_presses):
            pyautogui.press(direction)
    else:
        pyautogui.press(direction)

def parse_search_query(command):
    return command.rsplit(" 검색", 1)[0]

def play_nth_video(n):
    video_xpath = f'//*[@id="contents"]/ytd-video-renderer[{n}]//a'
    video_element = driver.find_element_by_xpath(video_xpath)
    video_element.click()


def parse_video_number(command):
    number_mapping = {
        '첫': 1,
        '두': 2,
        '세': 3,
        '네': 4,
        '다섯': 5,
        '여섯': 6,
        '일곱': 7,
        '여덟': 8,
        '아홉': 9,
        '열': 10
    }

    match = re.search(r'\d+', command)
    if match:
        return int(match.group())

    for korean_number, value in number_mapping.items():
        if korean_number in command:
            return value

    return None
def play_video(video_number, driver):
    # video_selector = f"#video-title[href*='watch?v=']:nth-of-type({video_number})"
    # # video = browser.find_element_by_css_selector(video_selector)
    # video = driver.find_element("css selector", video_selector)
    # video.click()
    try:
        video_selector = f"#contents > ytd-video-renderer:nth-child({video_number}) #video-title"
        video = driver.find_element("css selector", video_selector)
        video.click()
    except Exception as e:
        try:
            video_selector = f"#items > ytd-video-renderer:nth-child({video_number}) #video-title"
            video = driver.find_element("css selector", video_selector)
            video.click()
        except:
            play_audio_data("영상을 찾을 수 없어요.")
        # print("Error:", e)
        # print("Invalid video number or the element cannot be found.")
def play_pause_video(driver):
    play_pause_button = driver.find_element("css selector", "button.ytp-play-button")
    play_pause_button.click()

def next_video(driver):
    next_button = driver.find_element("css selector", "a.ytp-next-button")
    next_button.click()

def previous_video(driver):
    prev_button = driver.find_element("css selector", "a.ytp-prev-button")
    prev_button.click()

def seek_video(driver, seconds):
    video = driver.find_element("css selector", "video")
    driver.execute_script(f"arguments[0].currentTime += {seconds};", video)

def toggle_fullscreen(driver):
    fullscreen_button = driver.find_element("css selector", "button.ytp-fullscreen-button")
    fullscreen_button.click()
def skip_ad(driver):
    try:
        skip_ad_button = driver.find_element("css selector", "button.ytp-ad-skip-button")
        skip_ad_button.click()
    except NoSuchElementException:
        play_audio_data("광고 건너뛰기 버튼이 없어요.")
        pass


def set_video_time(driver, minutes, seconds):
    video = driver.find_element("css selector", "video")
    time_in_seconds = minutes * 60 + seconds
    driver.execute_script(f"arguments[0].currentTime = {time_in_seconds};", video)

def parse_time_command(command_str):
    time_pattern = r'(?:(\d+)분)?\s*(?:(\d+)초)?'
    match = re.search(time_pattern, command_str)
    if match:
        minutes = int(match.group(1)) if match.group(1) else 0
        seconds = int(match.group(2)) if match.group(2) else 0
        return minutes, seconds
    else:
        return None