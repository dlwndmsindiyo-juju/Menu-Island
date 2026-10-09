import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="inner flex">
        <img src="/main-icon-img.svg" alt="menu island 아이콘 이미지" />
        <h1 className="font-bold text-3xl">
          <Link to="/">Menu Island</Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
