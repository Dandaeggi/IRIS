import json
import os
iris_name = ''
command_open={}
command_close={}
command_search={}
command_create={}

def load_setting():
    # JSON 파일을 읽어옵니다.
    global iris_name
    global command_open
    global command_close
    global command_search
    global command_create
    global custom_open
    global custom_close
    global custom_search
    global combine_list
    global combine_open

    # with open("config.ini", "r", encoding="utf-8") as f:
    #     config_data = json.load(f)

    with open(os.getcwd() + "\\resources\\irisSettings.ini", "r", encoding="utf-8") as f:
        config_data = json.load(f)
    # 이리스 이름을 빼기
    iris_name = config_data["settings"]["irisname"]

    command_open = config_data["settings"]["command"]["open"]
    command_search = config_data["settings"]["command"]["search"]
    custom_open = config_data["settings"]["custom"]["open"]
    # custom_close = config_data["settings"]["custom"]["close"]
    # custom_search = config_data["settings"]["custom"]["search"]

    combine_list = config_data["settings"]["combine"]

    # print(list(combine_list.keys()))

    # command 안의 open, close, search, create를 빼기
    # command_open = config_data["settings"]["command"]["open"]
    # command_close = config_data["settings"]["command"]["close"]
    # command_search = config_data["settings"]["command"]["search"]
    # command_create = config_data["settings"]["command"]["create"]
    # print(command_open.keys())