import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1 className="font-bold text-center text-4xl text-white bg-green-800 py-20">
        <Link to="/">Menu Island</Link>
      </h1>
    </header>
  );
};

export default Header;
