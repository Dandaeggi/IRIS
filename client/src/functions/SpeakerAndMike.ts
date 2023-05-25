import { spawn } from "child_process";
import iconv from "iconv-lite";

function callDevices(): Promise<string> {
  console.log("python start");
  const pypath = "src/functions/pythoncode/deviceslist.py";

  return new Promise((resolve, reject) => {
    const process = spawn("python", [pypath]);
    process.stdout.on("data", (data: Buffer) => {
      const decodedData = iconv.decode(data, "utf8").trim();
      console.log(decodedData);
      resolve(decodedData);
    });
    process.stderr.on("data", (data: Buffer) => {
      console.log(data.toString(), "fail");
      reject(data.toString());
    });
  });
}

function startInput() {
  console.log("python start");
  const pypath = "src/functions/pythoncode/startinput.py";

  const process = spawn("python", [pypath]);
  process.stdout.on("data", (data: Array<number>) => {
    const result = data.reduce(function add(sum, value) {
      return sum + Math.abs(value);
    }, 0);
    console.log(data.length);
  });
  process.stderr.on("data", (data: Buffer) => {
    console.log(data.toString());
  });
}

function sendMikeChange(mikeindex: string): Promise<string> {
  console.log("python start");
  const pypath = "src/functions/pythoncode/mikechangecheck.py";

  return new Promise((resolve, reject) => {
    const process = spawn("python", [pypath, mikeindex]);
    process.stdout.on("data", (data: any) => {
      console.log(data.toString());
      resolve(data.toString());
    });
    process.stderr.on("data", (data: any) => {
      reject(data.toString());
    });
  });
}

function callSpeakerDevices(): Promise<string> {
  console.log("python start");
  const pypath = "src/functions/pythoncode/speakerlist.py";

  return new Promise((resolve, reject) => {
    const process = spawn("python", [pypath]);
    process.stdout.on("data", (data: any) => {
      const decodedData = iconv.decode(data, "utf8").trim();
      console.log(decodedData);
      resolve(decodedData);
    });
    process.stderr.on("data", (data: any) => {
      console.log(data.toString(), "fail");
      reject(data.toString());
    });
  });
}

function sendSpeakerChange(speakerindex: string): Promise<string> {
  console.log("python start");
  const pypath = "src/functions/pythoncode/speakerchangecheck.py";

  return new Promise((resolve, reject) => {
    const process = spawn("python", [pypath, speakerindex]);
    process.stdout.on("data", (data: any) => {
      console.log(data.toString());
      resolve(data.toString());
    });
    process.stderr.on("data", (data: any) => {
      reject(data.toString());
    });
  });
}

export default {
  callDevices,
  callSpeakerDevices,
  startInput,
  sendMikeChange,
  sendSpeakerChange,
};
