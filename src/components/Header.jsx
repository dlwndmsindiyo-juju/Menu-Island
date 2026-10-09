import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="inner flex justify-between items-center">
        <div className="flex items-center w-100">
          <img src="/main-icon-img.svg" alt="menu island 아이콘 이미지" />
          <h1 className="font-bold">
            <Link to="/">Menu Island</Link>
          </h1>
        </div>

        <nav className="gnb-list">
          <ul className="font-bold">
            <li className="assign">
              <Link to={"/assign"}>지정메뉴</Link>
            </li>
            <li className="select">
              <Link to={"/select"}>메뉴입력</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
