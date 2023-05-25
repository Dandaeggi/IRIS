import os
import winreg

def get_installed_programs():
    programs = []
    reg_keys = [winreg.HKEY_LOCAL_MACHINE]
    for reg_key in reg_keys:
        for subkey in ["SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall", "SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall"]:
            try:
                with winreg.OpenKey(reg_key, subkey) as key:
                    for i in range(0, winreg.QueryInfoKey(key)[0]):
                        try:
                            subkey_name = winreg.EnumKey(key, i)
                            with winreg.OpenKey(key, subkey_name) as subkey:
                                name = winreg.QueryValueEx(subkey, "DisplayName")[0]
                                icon_path = winreg.QueryValueEx(subkey, "DisplayIcon")[0]
                                programs.append({"name": name, "icon_path": icon_path})
                        except OSError:
                            pass
            except OSError:
                pass
        start_menu_path = os.path.join(os.environ["APPDATA"], "Microsoft", "Windows", "Start Menu", "Programs")
        for root, dirs, files in os.walk(start_menu_path):
            for file in files:
                if file.endswith(".lnk"):
                    name = os.path.splitext(file)[0]
                    programs.append({"name": name, "icon_path": os.path.join(root, file)})
    return programs

# def get_installed_programs():
#     programs = []
#     reg_keys = [winreg.HKEY_LOCAL_MACHINE]
#
#     for reg_key in reg_keys:
#         for subkey in ["SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall", "SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall"]:
#             try:
#                 with winreg.OpenKey(reg_key, subkey) as key:
#                     for i in range(0, winreg.QueryInfoKey(key)[0]):
#                         try:
#                             subkey_name = winreg.EnumKey(key, i)
#                             with winreg.OpenKey(key, subkey_name) as subkey:
#                                 name = winreg.QueryValueEx(subkey, "DisplayName")[0]
#                                 icon_path = winreg.QueryValueEx(subkey, "DisplayIcon")[0]
#                                 exe_path = winreg.QueryValueEx(subkey, "InstallLocation")[0]
#
#                                 if os.path.exists(exe_path):
#                                     exe_files = [f for f in os.listdir(exe_path) if f.endswith('.exe')]
#                                     if exe_files:
#                                         exe_path = os.path.join(exe_path, exe_files[0])
#
#                                 programs.append({"name": name, "icon_path": icon_path, "exe_path": exe_path})
#                         except OSError:
#                             pass
#             except OSError:
#                 pass
#
#     start_menu_path = os.path.join(os.environ["APPDATA"], "Microsoft", "Windows", "Start Menu", "Programs")
#     for root, dirs, files in os.walk(start_menu_path):
#         for file in files:
#             if file.endswith(".lnk"):
#                 name = os.path.splitext(file)[0]
#                 programs.append({"name": name, "icon_path": os.path.join(root, file)})
#
#     return programs



programs = get_installed_programs()
# for program in programs:
#     print(program["name"], program["icon_path"])
