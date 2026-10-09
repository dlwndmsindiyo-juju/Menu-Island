import React, { useEffect, useRef, useState } from "react";

const SelectCanvas = () => {
  const canvasRef = useRef(null);

  // 1. 상태 관리 (개수, 입력된 항목 리스트, 회전 상태, 결과)
  const [itemCount, setItemCount] = useState(6); // 기본 6개
  const [items, setItems] = useState([
    { name: "메뉴 1", color: "#ff6384" },
    { name: "메뉴 2", color: "#ffb663" },
    { name: "메뉴 3", color: "#63beff" },
    { name: "메뉴 4", color: "#b9ff63" },
    { name: "메뉴 5", color: "#e263ff" },
    { name: "메뉴 6", color: "#3b9ec0" },
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");

  // 무작위 색상 생성을 위한 팔레트
  const colorPalette = [
    "#ff6384",
    "#ffb663",
    "#63beff",
    "#b9ff63",
    "#e263ff",
    "#6863ff",
    "#3b9ec0",
    "#ff6384",
    "#ff9f40",
    "#4bc0c0",
    "#9966ff",
    "#ffcd56",
  ];

  // 2. 개수(- / +) 변경 핸들러 (2개 ~ 12개 제한)
  const handleCountChange = (delta) => {
    if (isSpinning) return;

    const newCount = itemCount + delta;
    if (newCount < 2 || newCount > 12) return; // 2개 미만, 12개 초과 방지

    setItemCount(newCount);

    // 개수에 맞춰 items 배열 조절
    setItems((prevItems) => {
      if (newCount > prevItems.length) {
        // 늘어날 때: 기존 항목 유지 + 새 항목 추가
        const added = Array.from(
          { length: newCount - prevItems.length },
          (_, i) => ({
            name: `메뉴 ${prevItems.length + i + 1}`,
            color: colorPalette[(prevItems.length + i) % colorPalette.length],
          }),
        );
        return [...prevItems, ...added];
      } else {
        // 줄어들 때: 앞에서부터 자르기
        return prevItems.slice(0, newCount);
      }
    });
  };

  // 3. 인풋 박스 텍스트 변경 핸들러
  const handleInputChange = (index, value) => {
    const newItems = [...items];
    newItems[index].name = value;
    setItems(newItems);
  };

  // 4. 캔버스에 원판 그리기 함수
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

      // 부채꼴 그리기
      ctx.beginPath();
      ctx.fillStyle = item.color;
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + arc);
      ctx.lineTo(centerX, centerY);
      ctx.fill();
      ctx.stroke();

      // 텍스트 쓰기
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(currentAngle + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#333";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(item.name || `항목 ${i + 1}`, radius - 20, 10);
      ctx.restore();
    });
  };

  // items가 바뀔 때마다 캔버스 다시 그림
  useEffect(() => {
    drawRoulette(0);
  }, [items]);

  // 5. 돌림판 돌리기 로직 및 당첨 계산
  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult("");

    const randomAdditional = Math.random() * 360;
    const spinAngleDeg = 360 * 5 + randomAdditional; // 최소 5바퀴 회전
    const duration = 3000;
    const start = performance.now();

    const animateSpin = (currentTime) => {
      const elapsed = currentTime - start;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentAngleDeg = easeProgress * spinAngleDeg;
        const currentAngleRad = currentAngleDeg * (Math.PI / 180);

        drawRoulette(currentAngleRad);
        requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);

        // 당첨 항목 계산 (12시 방향 화살표 기준)
        const finalAngleDeg = spinAngleDeg % 360;
        const arcDeg = 360 / items.length;
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
      {/* 1단계: 개수 조절 (- / + 버튼) */}
      <div className="flex items-center gap-4 mb-6 flex-col">
        <span className="font-bold text-2xl">선택지 개수를 정해주세요.</span>
        <p className="text-white px-4 py-1 rounded-full bg-blue-500 font-bold">
          2~12개
        </p>
        <div>
          <button
            onClick={() => handleCountChange(-1)}
            disabled={isSpinning || itemCount <= 2}
            className="mr-2 px-3 py-1 bg-gray-200 rounded font-bold disabled:opacity-50"
          >
            -
          </button>
          <span className="text-xl font-bold">{itemCount}</span>
          <button
            onClick={() => handleCountChange(1)}
            disabled={isSpinning || itemCount >= 12}
            className="ml-2 px-3 py-1 bg-gray-200 rounded font-bold disabled:opacity-50"
          >
            +
          </button>
        </div>
      </div>

      {/* 2단계: 사용자 입력 인풋 박스들 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 w-full max-w-2xl px-4">
        {items.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item.name}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`항목 ${index + 1}`}
            disabled={isSpinning}
            className="border px-3 py-1 rounded text-sm focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>

      {/* 화살표 */}
      <div
        className="pointer-arrow"
        style={{
          width: 0,
          height: 0,
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderTop: "20px solid #333",
          zIndex: 10,
          marginBottom: "-5px",
        }}
      />

      {/* 캔버스 원판 */}
      <div className="relative">
        <canvas ref={canvasRef} width={400} height={400} className="canvas" />
      </div>

      {/* 돌리기 버튼 */}
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

export default SelectCanvas;
