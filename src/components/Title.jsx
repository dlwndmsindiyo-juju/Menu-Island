import React from "react";

const Title = () => {
  return (
    <div className="inner">
      <div className="text-box">
        <h2 className="font-bold mt-10 text-2xl">세상에서 제일 큰 고민은?</h2>
        <p className="font-bold mt-2 text-xl text-red-500 ">메뉴 고르기</p>
      </div>
      <div className="img-box">
        <img
          className="w-100 m-auto mt-10 mb-10"
          src="./hero-img.png"
          alt="menu island 메인 화면 이미지"
        />
      </div>
      <div className="main-text">
        <p>그래서 만들었습니다.</p>
        <p>오늘도 맛있는 하루 보내세요.</p>
      </div>
    </div>
  );
};

export default Title;
