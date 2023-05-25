# 일렉트론 앱 배포

# 앱 배포 방식

- Electron Forge + python.exe

# 파이썬 빌드 ( 일렉트론 앱에 포함될 .exe  )

## 파이썬 가상환경 생성

```jsx
python -m venv 가상환경이름
```

## 파이썬 가상환경 진입

```jsx
가상환경 이름\Scripts\activate.bat
```

## 라이브러리 및 패키지 설치

```jsx
pip install -r requirements.txt
```

## 1차  빌드 실행 ( irisSTT.spec 생성을 위함 )

```jsx
pyinstaller --onefile irisSTT.py
```

## 2차 빌드 실행 ( irisSTT.exe 생성을 위함 )

### irisSTT.spec의 내용을 아래와 같이 변경

```jsx
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
```

```jsx
pyinstaller irisSTT.spec
```

### grpc 오류

hook-grpc.py를 찾아서 아래와 같이 수정

```jsx
from PyInstaller.utils.hooks import collect_data_files
datas = collect_data_files ( 'grpc' )
```

### google-cloud-core 오류

```jsx
pip install google-cloud-core
```

### spec 파일

```jsx
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
```

## 일렉트론 폴더 내로 .exe 파일 이동

```jsx
C:\Users\{유저이름}\AppData\Local\iris\app-1.0.0\resources\irisSTT-v2 로 이동
```

# 일렉트론 앱 생성

```bash
npm init electron-app@latest my-app -- **--template=webpack**
```

## 초기화 시 템플릿 옵션

- webpack
    - webpack 플러그인 구축
- webpack-typescript
    - typescript 환경 구축

# 앱 시작하기

```bash
cd my-app
npm start
```

# Makers 설정

## package.json

```json
{
  "name": "iris",
  "productName": "iris",
  "version": "1.0.0",
  "description": "My Electron application description",
  "main": ".webpack/main",
  "scripts": {
    "start": "cross-env NODE_ENV=development electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make",
    "publish": "electron-forge publish",
    "lint": "eslint src/ --ext .ts,.js,.tsx,.jsx"
  },
  "keywords": [
    "electron-webpack",
    "electron-react",
    "electron-typescript"
  ],
  "author": {
    "name": "iris"
  },
  "license": "MIT",
  **"config": {
    "forge": "./tools/forge/forge.config.js"
  },**
  "devDependencies": {
    "@electron-forge/cli": "6.0.5",
    "@electron-forge/maker-deb": "6.0.5",
    "@electron-forge/maker-rpm": "6.0.5",
    "@electron-forge/maker-squirrel": "6.0.5",
    "@electron-forge/maker-zip": "6.0.5",
    "@electron-forge/plugin-webpack": "6.0.5",
    "@marshallofsound/webpack-asset-relocator-loader": "^0.5.0",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.5.10",
    "@types/node": "^18.14.6",
    "@types/p5": "^1.6.0",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@types/react-router-dom": "^5.3.3",
    "@types/webpack-env": "^1.18.0",
    "@typescript-eslint/eslint-plugin": "^5.54.0",
    "@typescript-eslint/parser": "^5.54.0",
    "@vercel/webpack-asset-relocator-loader": "^1.7.3",
    "classnames": "^2.3.2",
    "cross-env": "^7.0.3",
    "css-loader": "^6.7.3",
    "electron": "^23.1.2",
    "eslint": "^8.35.0",
    "eslint-import-resolver-alias": "^1.1.2",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-react": "^7.32.2",
    "file-loader": "^6.2.0",
    "fork-ts-checker-webpack-plugin": "^7.3.0",
    "less": "^4.1.3",
    "less-loader": "11.1.0",
    "node-loader": "^2.0.0",
    "react-refresh": "^0.14.0",
    "sass": "^1.58.3",
    "sass-loader": "^13.2.0",
    "style-loader": "^3.3.1",
    "ts-loader": "9.4.2",
    "typescript": "^4.9.5",
    "webpack": "^5.75.0"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^1.9.3",
    "axios": "^1.3.4",
    "electron-squirrel-startup": "^1.0.0",
    "ini": "^4.0.0",
    "p5": "^1.6.0",
    "pip": "^0.0.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-p5": "^1.3.35",
    "react-redux": "^8.0.5",
    "react-router-dom": "^6.9.0",
    "redux-persist": "^6.0.0",
    "tree-kill": "^1.2.2"
  }
}
```

### 프로젝트 정보 설정

```jsx
{
  "name": "iris",
  "productName": "iris",
  "version": "1.0.0",
  "description": "My Electron application description"
}
```

- 프로젝트 이름, 버전, 설명

### forge config 파일 경로 지정

```jsx
**"config": {
    "forge": "./tools/forge/forge.config.js"
 }**
```

### dependency 설정

```jsx
"devDependencies": {
    "@electron-forge/cli": "6.0.5",
    "@electron-forge/maker-deb": "6.0.5",
    "@electron-forge/maker-rpm": "6.0.5",
    "@electron-forge/maker-squirrel": "6.0.5",
    "@electron-forge/maker-zip": "6.0.5",
    "@electron-forge/plugin-webpack": "6.0.5",
    "@marshallofsound/webpack-asset-relocator-loader": "^0.5.0",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.5.10",
    "@types/node": "^18.14.6",
    "@types/p5": "^1.6.0",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@types/react-router-dom": "^5.3.3",
    "@types/webpack-env": "^1.18.0",
    "@typescript-eslint/eslint-plugin": "^5.54.0",
    "@typescript-eslint/parser": "^5.54.0",
    "@vercel/webpack-asset-relocator-loader": "^1.7.3",
    "classnames": "^2.3.2",
    "cross-env": "^7.0.3",
    "css-loader": "^6.7.3",
    "electron": "^23.1.2",
    "eslint": "^8.35.0",
    "eslint-import-resolver-alias": "^1.1.2",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-react": "^7.32.2",
    "file-loader": "^6.2.0",
    "fork-ts-checker-webpack-plugin": "^7.3.0",
    "less": "^4.1.3",
    "less-loader": "11.1.0",
    "node-loader": "^2.0.0",
    "react-refresh": "^0.14.0",
    "sass": "^1.58.3",
    "sass-loader": "^13.2.0",
    "style-loader": "^3.3.1",
    "ts-loader": "9.4.2",
    "typescript": "^4.9.5",
    "webpack": "^5.75.0"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^1.9.3",
    "axios": "^1.3.4",
    "electron-squirrel-startup": "^1.0.0",
    "ini": "^4.0.0",
    "p5": "^1.6.0",
    "pip": "^0.0.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-p5": "^1.3.35",
    "react-redux": "^8.0.5",
    "react-router-dom": "^6.9.0",
    "redux-persist": "^6.0.0",
    "tree-kill": "^1.2.2"
  }
```

## forge.config.js

```jsx
// Forge Configuration
const path = require("path");
const rootDir = process.cwd();

module.exports = {
  // Packager Config
  packagerConfig: {
    extraResource: [
      "src/main/irisSTT-v2"
    ],
    // Create asar archive for main, renderer process files
    asar: true,
    // Set executable name
    executableName: "iris",
    // Set application copyright
    appCopyright: "iris",
    // Set application icon
    icon: path.resolve("assets/images/appIcon.ico"),
  },
  // Forge Makers(윈도우 제외하고 다 삭제)
  makers: [
    {
      // Squirrel.Windows is a no-prompt, no-hassle, no-admin method of installing
      // Windows applications and is therefore the most user friendly you can get.
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "iris",
      },
    },
  ],
  // Forge Plugins
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        // Fix content-security-policy error when image or video src isn't same origin
        // Remove 'unsafe-eval' to get rid of console warning in development mode.
        devContentSecurityPolicy: `default-src 'self' http://j8b102.p.ssafy.io:9000 * 'unsafe-inline' data:; script-src 'self'  'unsafe-inline' data:`,
        // Ports
        port: 3000, // Webpack Dev Server port
        loggerPort: 9000, // Logger port
        // Main process webpack configuration
        mainConfig: path.join(rootDir, "tools/webpack/webpack.main.js"),
        // Renderer process webpack configuration
        renderer: {
          // Configuration file path
          config: path.join(rootDir, "tools/webpack/webpack.renderer.js"),
          // Entrypoints of the application
          entryPoints: [
            {
              // Window process name
              name: "app_window",
              // React Hot Module Replacement (HMR)
              rhmr: "react-hot-loader/patch",
              // HTML index file template
              html: path.join(rootDir, "src/renderer/app.html"),
              // Renderer
              js: path.join(rootDir, "src/renderer/appRenderer.tsx"),
              // Main Window
              // Preload
              preload: {
                js: path.join(rootDir, "src/renderer/appPreload.tsx"),
              },
            },
            {
              // Window process name
              name: "response",
              // React Hot Module Replacement (HMR)
              rhmr: "react-hot-loader/patch",
              // HTML index file template
              html: path.join(rootDir, "src/renderer/response.html"),
              // Renderer
              js: path.join(rootDir, "src/renderer/responseRenderer.tsx"),
              // Main Window
              // Preload
              preload: {
                js: path.join(rootDir, "src/renderer/responsePreload.tsx"),
              },
            },
          ],
        },
        devServer: {
          liveReload: false,
        },
      },
    },
  ],
};
```

### extraResource

- 일렉트론과 함께 패키징 할 외부 폴더들을 지정

```jsx
extraResource: [
      "src/main/irisSTT-v2"
]
```

- 배포 완료 시 아래 폴더에 지정한 외부 폴더가 복사됨
    - [프로그램 설치 경로]/app-1.0.0/resources

### asar 설정

```jsx
asar: true
```

- main, renderer 파일들을 asar 아카이브 방식으로 압축

### plugins

```jsx
plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        // Fix content-security-policy error when image or video src isn't same origin
        // Remove 'unsafe-eval' to get rid of console warning in development mode.
        devContentSecurityPolicy: `default-src 'self' http://j8b102.p.ssafy.io:9000 * 'unsafe-inline' data:; script-src 'self'  'unsafe-inline' data:`,
        // Ports
        port: 3000, // Webpack Dev Server port
        loggerPort: 9000, // Logger port
        // Main process webpack configuration
        mainConfig: path.join(rootDir, "tools/webpack/webpack.main.js"),
        // Renderer process webpack configuration
        renderer: {
          // Configuration file path
          config: path.join(rootDir, "tools/webpack/webpack.renderer.js"),
          // Entrypoints of the application
          entryPoints: [
            {
              // Window process name
              name: "app_window",
              // React Hot Module Replacement (HMR)
              rhmr: "react-hot-loader/patch",
              // HTML index file template
              html: path.join(rootDir, "src/renderer/app.html"),
              // Renderer
              js: path.join(rootDir, "src/renderer/appRenderer.tsx"),
              // Main Window
              // Preload
              preload: {
                js: path.join(rootDir, "src/renderer/appPreload.tsx"),
              },
            },
            {
              // Window process name
              name: "response",
              // React Hot Module Replacement (HMR)
              rhmr: "react-hot-loader/patch",
              // HTML index file template
              html: path.join(rootDir, "src/renderer/response.html"),
              // Renderer
              js: path.join(rootDir, "src/renderer/responseRenderer.tsx"),
              // Main Window
              // Preload
              preload: {
                js: path.join(rootDir, "src/renderer/responsePreload.tsx"),
              },
            },
          ],
        },
        devServer: {
          liveReload: false,
        },
      },
    },
  ]
```

- webpack 플러그인 사용
    - IP 설정
    - PORT 설정
    - renderer 프로세스 설정

# 빌드 및 배포

```bash
npm run make
```

- 프로젝트 빌드 및 배키징 진행
- setup.exe 파일 생성
    - 생성 위치
        - [프로젝트 경로]/out/make/squirrel.windows/x64