import React, { useEffect, useRef, useState } from "react";
import { data } from "../assets/hooks/data";

const Canvas = () => {
  /** 1. 상태 및 참조(Ref) 정의 */
  const canvasRef =
    useRef(null); /** 실제 html 캔버스 dom 요소에 접근하기 위한 훅 */
  const [items] = useState(data); /** 데이터 연결 */
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");

  /** 원판을 캔버스에 그리는 함수 */
  const drawRoulette = (angle = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const arc = (2 * Math.PI) / items.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    items.forEach((item, i) => {
      const currentAngle = angle + i * arc;

      /** 부채꼴 그리기 */
      ctx.beginPath(); // 새로운 도형을 그린다 (시작)
      ctx.fillStyle = item.color; // 브러쉬에 물감 묻히기
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + arc); // 모양 경로 잡기
      ctx.lineTo(centerX, centerY);
      ctx.fill(); // 아까 브러쉬에 묻힌 색으로 칠하기
      ctx.stroke();

      /** 텍스트 쓰기 */
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(currentAngle + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(item.name, radius - 20, 10); // 상품 글자를 작성
      ctx.restore();
    });
  };

  useEffect(() => {
    drawRoulette(0);
  }, [items]);

  /** 돌림판 돌리기 로직 */
  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult("");

    const spinAngle = Math.random() * 1000 + 2000;
    const duration = 3000;
    const start = performance.now();

    const animateSpin = (currentTime) => {
      const elapsed = currentTime - start;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentAngle = easeProgress * spinAngle * (Math.PI / 180);

        drawRoulette(currentAngle);
        requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);
        /** todo : 회전이 끝난 후 당첨 결과 계산 로직 추가 */
      }
    };
    requestAnimationFrame(animateSpin);
  };

  return (
    <div className="inner container py-30 flex justify-center items-center relative ">
      <div className="pointer ">
        <canvas ref={canvasRef} width={400} height={400} className="canvas" />
      </div>
      <div className="absolute bottom-10 ">
        <button
          onClick={spinRoulette}
          disabled={isSpinning}
          className="spin-btn border px-10 py-1 rounded-full bg-gray-100"
        >
          {isSpinning ? "돌아가는 중..." : "돌리기"}
        </button>
        {result && <div className="result-text">결과: {result}</div>}
      </div>
    </div>
  );
};

export default Canvas;
