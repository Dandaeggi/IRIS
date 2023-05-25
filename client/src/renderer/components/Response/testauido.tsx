import React, { useEffect, useRef } from "react";

const testauido: React.FC = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);
  const bufferLength = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 오디오 컨텍스트 및 분석기 설정
    audioContext.current = new (window.AudioContext || window.AudioContext)();
    analyser.current = audioContext.current.createAnalyser();
    analyser.current.fftSize = 2048;
    bufferLength.current = analyser.current.frequencyBinCount;
    dataArray.current = new Uint8Array(bufferLength.current);

    // 마이크 접근 및 스트림 설정
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const source = audioContext.current.createMediaStreamSource(stream);
        source.connect(analyser.current);

        draw();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  const MAX_CIRCLE_RADIUS = 45; // 원하는 최대 원 크기로 변경 가능
  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const drawVisualizer = () => {
      requestAnimationFrame(drawVisualizer);

      analyser.current.getByteFrequencyData(dataArray.current);

      ctx.clearRect(0, 0, width, height);

      const numberOfCircles = 150; // 원 개수 파악하기
      const maxRadius = Math.min(width, height) / 1.5;
      const minRadius = maxRadius * 0.1;

      for (let i = 0; i < numberOfCircles; i++) {
        const dataIndex = Math.floor(
          (i / numberOfCircles) * bufferLength.current
        );
        const amplitude = dataArray.current[dataIndex] / 255;

        const radius = Math.min(
          MAX_CIRCLE_RADIUS,
          minRadius + (maxRadius - minRadius) * amplitude
        );

        // 색상 변경
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(166, 187, 220, ${0.1 + 0.2 * amplitude})`;
        ctx.stroke();
      }
    };
    drawVisualizer();
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight / 2}
    />
  );
};

export default testauido;
