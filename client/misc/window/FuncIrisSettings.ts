const fs = require("fs");
// const axios = require("axios");
const deployFlag = true; //make 할때는 true, start는 false
const path = !deployFlag
  ? "./src/irisSettings.ini"
  : process.resourcesPath + "/irisSettings.ini";

class FuncIrisSettings {
  settings;

  constructor(
    user = "",
    irisname = "이리스",
    version = "google",
    command: object = {
      open: {
        계산기: "C:\\WindowsSystem32\\calc.exe",
        그림판: "C:\\Windows\\System32\\mspaint.exe",
        메모장: "C:\\Windows\\System32\\notepad.exe",
        제어판: "C:\\Windows\\System32\\control",
        유튜브: "explorer https:\\\\www.youtube.com\\",
        구글: "explorer https:\\\\www.google.com\\",
      },
      search: "explorer “https:\\\\www.google.com\\search?q=”",
    },
    custom: object = {
      open: {},
    },
    combine: object = {}
  ) {
    this.settings = {
      user: user,
      irisname: irisname,
      version: version,
      command: command,
      custom: custom,
      combine: combine,
    };
  }

  createDefault() {
    const defaultsettings = new FuncIrisSettings();
    fs.writeFile(path, JSON.stringify(defaultsettings), function (err: string) {
      console.log("default settings save !!");
    });
  }

  // updateSettings(email: string, info: any) {
  //   console.log("updateSettings 시작");
  //   const oldsettings = JSON.parse(
  //     fs.readFileSync(path, (data: string, err: string) => {
  //       console.log("콜백 내부");
  //       if (err != null) {
  //         console.log("콜백 if 내부");
  //         console.log(data);
  //         throw err;
  //       }
  //     })
  //   );
  //   let newsettings;
  //   console.log("newsettings지남", oldsettings["settings"]["version"]);
  //   if (Object.keys(info)[0] === "irisname") {
  //     newsettings = new FuncIrisSettings(
  //       email,
  //       info["irisname"],
  //       oldsettings["settings"]["version"],
  //       oldsettings["settings"]["command"]
  //     );
  //   } else if (Object.keys(info)[0] === "version") {
  //     newsettings = new FuncIrisSettings(
  //       email,
  //       oldsettings["settings"]["irisname"],
  //       info["version"],
  //       oldsettings["settings"]["command"]
  //     );
  //   } else if (Object.keys(info)[0] === "command") {
  //     if (Object.keys(info.command)[0] === "open") {
  //       oldsettings["settings"]["command"]["open"][
  //         Object.keys(info.command.open)[0]
  //       ] = Object.values(info["command"]["open"])[0];
  //     } else if (Object.keys(info.command)[0] === "close") {
  //       oldsettings["settings"]["command"]["close"][
  //         Object.keys(info.command.close)[0]
  //       ] = Object.values(info["command"]["close"])[0];
  //     } else if (Object.keys(info.command)[0] === "search") {
  //       oldsettings["settings"]["command"]["search"][
  //         Object.keys(info.command.search)[0]
  //       ] = Object.values(info["command"]["search"])[0];
  //     }
  //     newsettings = new FuncIrisSettings(
  //       email,
  //       oldsettings["settings"]["irisname"],
  //       oldsettings["settings"]["version"],
  //       oldsettings["settings"]["command"]
  //     );
  //   }

  //   fs.writeFileSync(path, JSON.stringify(newsettings), function (err: string) {
  //     console.log("Settings 업데이트 완");
  //     console.log("error?", err);
  //   });
  // axios.put("http://localhost:9000/user/savesettings", { "newSettings": JSON.stringify(newsettings)}, {
  //     headers: {"Content-type": 'application/json', "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYWJvcmF0b3J5Njg4OUBnbWFpbC5jb20iLCJhdXRoIjoiIiwiZXhwIjoxNjc5NTc3NDkyfQ.G9vsuKzP87w7lecDfgZLwSbnT4woUf8AtjsLjP8ihJY" }
  // })
  // .then((res:string) => {
  //     console.log("DB 저장 완", res)
  // })
  // .catch((err:string) => {
  //     console.log("DB 저장 패", err)
  // })
  // }
}

export default FuncIrisSettings;
