import React, { useEffect, useRef, useState } from "react";
import { data } from "../hooks/data";

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
      ctx.fillStyle = "#111";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(item.name, radius - 20, 10); // 상품 글자를 작성
      ctx.restore();
    });
  };

  useEffect(() => {
    drawRoulette(0);
  }, [items]);

  /** 돌림판 돌리기 로직과 당첨 계산 */
  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult("");

    /** 무작위 회전 각도 생성 */
    const randomAdditional = Math.random() * 360;
    const spinAngle = 360 * 5 + randomAdditional; // 최소 5바퀴 이상 회전
    const duration = 3000;
    const start = performance.now();

    const animateSpin = (currentTime) => {
      const elapsed = currentTime - start;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentAngleDeg = easeProgress * spinAngle;
        const currentAngle = currentAngleDeg * (Math.PI / 180);

        drawRoulette(currentAngle);
        requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);
        /** todo : 회전이 끝난 후 당첨 결과 계산 로직 추가 */

        /** 당첨 계산 로직 */
        // 12시 방향에 오는 인덱스를 계산
        const finalAngleDeg = spinAngle % 360;
        const arcDeg = 360 / items.length;

        /** 12시 방향은 수학적으로 -90도 위치이므로 이에 맞춰 당첨 인덱스 계산 */
        const normalizedAngle = (360 - (finalAngleDeg % 360) + 270) % 360;
        const winningIndex = Math.floor(normalizedAngle / arcDeg);
        const winningItem = items[winningIndex];

        setResult(winningItem.name);

        window.alert(`축하합니다! ${winningItem.name} 당첨!`);
      }
    };
    requestAnimationFrame(animateSpin);
  };

  return (
    <div className="inner container py-10 flex flex-col justify-center items-center relative">
      {/* 룰렛 상단 고정 화살표 */}
      <div className="pointer-arrow "></div>
      <div className="pointer">
        <canvas ref={canvasRef} width={400} height={400} className="canvas" />
      </div>

      <div className="mt-8">
        <button
          onClick={spinRoulette}
          disabled={isSpinning}
          className="spin-btn border px-10 py-2 rounded-full bg-blue-500 text-white font-bold cursor-pointer disabled:bg-gray-400"
        >
          {isSpinning ? "돌아가는 중..." : "원판 돌리기"}
        </button>
        {result && (
          <div className="result-text mt-4 text-center text-lg font-bold">
            결과: {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
