# -*- mode: python ; coding: utf-8 -*-
import sys
sys.setrecursionlimit(10**7)

block_cipher = None


a = Analysis(
    ['irisSTT.py'],
    pathex=['C:\\Users\\SSAFY\\Desktop\\iris_v0.1\\ju\\S08P22B102\\src\\main\\content\\STT'],
    binaries=[],
    datas=[],
    hiddenimports=['CommandProcess','FindProgram','GetSpeech','GoogleSTT','LoadSetting','WordProcess'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='irisSTT',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)