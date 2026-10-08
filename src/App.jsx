import { useState } from "react";
import heroImg from "./assets/hero.png";
import "./App.css";
import KakaoMap from "./components/KakaoMap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <KakaoMap />
    </>
  );
}

export default App;
