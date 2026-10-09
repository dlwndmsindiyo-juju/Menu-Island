import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Title from "./components/Title";
import Canvas from "./components/Canvas";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Title />
              <Canvas />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
