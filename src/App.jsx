import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Title from "./components/Title";
import Canvas from "./components/Canvas";
import SelectCanvas from "./components/SelectCanvas";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/assign" element={<Canvas />} />
        <Route path="/select" element={<SelectCanvas />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
