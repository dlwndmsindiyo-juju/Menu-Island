import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Title from "./components/Title";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Title />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
