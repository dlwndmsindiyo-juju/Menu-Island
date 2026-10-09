import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="inner flex justify-between items-center">
        <div className="flex items-center w-100">
          <img src="/main-icon-img.svg" alt="menu island 아이콘 이미지" />
          <h1 className="font-bold text-3xl">
            <Link to="/">Menu Island</Link>
          </h1>
        </div>

        <nav className="gnb-list">
          <ul className="flex gap-4 font-bold">
            <li className="assign">
              <Link to={"/assign"}>지정원판</Link>
            </li>
            <li className="select">
              <Link to={"/select"}>선택원판</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
