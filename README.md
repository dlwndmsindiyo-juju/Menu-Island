# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🌞 Menu Island

> **세상에서 제일 큰 고민은? 메뉴 고르기.**
> 그래서 만들었습니다. 오늘도 맛있는 하루 보내세요.

점심 메뉴를 대신 골라주는 **메뉴판 룰렛**입니다.
거창한 서비스는 아니에요. 돌리면 정해지고, 정해지면 먹으러 가면 됩니다. 딱 그게 전부예요.

---

## 🍚 왜 만들었냐면

점심시간 12시, 팀원들끼리 "뭐 먹지?"만 15분째 하고 있는 그 상황 다들 아시죠.
메뉴 하나 정하는 데 에너지를 다 써버리면 정작 밥맛이 떨어집니다.

- 빨리 점심 메뉴를 정해야 하는 **직장인**
- "아무거나"라고 말하면서 사실 아무거나는 싫은 **결정장애 인간들**
- 눈 뜨자마자 "오늘 밥 뭐 먹지?"부터 생각하는 **저 자신**

이 사람들의 고민을 룰렛 한 번으로 끝내주고 싶었습니다.
고민은 룰렛이 하고, 우리는 먹기만 하면 됩니다.

솔직히 말하면 **밥에 진심인 제가 제일 필요했던 서비스**예요.
맛없는 건 먹기 싫고, 항상 최선의 선택을 하고 싶은 사람이라, 그런 저 같은 사람을 위해 만들었습니다.

---

## 🏝️ 이름이 Menu Island인 이유

**점심 메뉴를 고르는 즐거운 섬(공간)** 이라는 콘셉트입니다.

메뉴 고르기는 보통 스트레스인데, 여기에 오면 그냥 놀이가 되게 하고 싶었어요.
잠깐 들러서 룰렛 돌리고, 웃고, 먹으러 가는 작은 섬 같은 곳이요.

---

## ☀️ 해가 치킨 먹는 그림인 이유

로고와 메인 이미지는 **해(sun)가 치킨을 먹고 있는 그림**입니다.
이유는 간단해요. 저는 눈 뜨자마자 밥 뭐 먹을지 생각하거든요. 해가 뜨면 일단 먹는 거죠.

그리고 일부러 **초등학생이 그린 그림일기 같은 느낌**으로 뽑았습니다.
솔직히 이 프로젝트의 주인공은 룰렛이고, 이미지와 아이콘은 사이트에 얼굴이 필요해서 넣은 거예요.
그래서 힘을 빼고 귀엽고 투박하게 갔습니다. 그게 오히려 Menu Island다운 것 같기도 하고요.

---

## 🎡 기능

### 1. 지정메뉴 (`/assign`)

이미 준비된 **18가지 메뉴**를 돌립니다. 고민 없이 그냥 돌리세요.

제육덮밥 · 돈까스 · 김밥 · 햄버거 · 떡볶이 · 파스타 · 샌드위치 · 짜장면 · 곱창 · 짬뽕 · 비빔밥 · 라면 · 초밥 · 볶음밥 · 카레 · 김치찜 · 회덮밥 · 삼겹살

### 2. 메뉴입력 (`/select`)

오늘 후보가 따로 있다면 **내가 직접 입력**해서 돌립니다.

- 선택지 개수는 **2~12개**
- `-` / `+` 버튼으로 개수 조절
- 칸마다 원하는 메뉴 이름 입력
- 돌리는 중에는 입력과 조절이 잠깁니다 (중간에 바꿔치기 금지)

### 룰렛 동작

- 최소 **5바퀴** 이상 돌고, 약 **3초** 동안 서서히 느려지며 멈춥니다.
- 12시 방향 화살표가 가리키는 칸이 당첨!
- 결과는 알림창과 화면 하단에 같이 표시됩니다.

---

## 🛠️ 사용 기술

| 구분       | 내용                                         |
| ---------- | -------------------------------------------- |
| 프레임워크 | React                                        |
| 라우팅     | React Router (`react-router-dom`)            |
| 스타일     | Tailwind CSS + 직접 작성한 CSS               |
| 룰렛       | HTML5 Canvas API (라이브러리 없이 직접 구현) |

룰렛은 외부 라이브러리 없이 **Canvas로 부채꼴을 하나하나 그리고, `requestAnimationFrame`으로 돌렸습니다.**
이 프로젝트에서 제일 공들인 부분이 여기예요.

---

## 📁 폴더 구조

```
src
├── App.jsx                 # 라우팅
├── App.css                 # 헤더/푸터/반응형 스타일
├── index.css               # Tailwind + 기본 리셋
├── hooks
│   └── data.js             # 지정메뉴 18개 데이터
└── components
    ├── Header.jsx          # 로고 + 메뉴 이동
    ├── Footer.jsx
    ├── Title.jsx           # 메인 화면
    ├── Canvas.jsx          # 지정메뉴 룰렛
    └── SelectCanvas.jsx    # 직접 입력 룰렛

public
├── main-icon-img.svg       # 아이콘
└── hero-img.png            # 메인 이미지
```

---

## 🚀 실행 방법

```bash
npm install
npm run dev
```

---

## 🍽️ 마지막으로

메뉴는 룰렛이 정했습니다. 이제 뒤돌아보지 말고 먹으러 갑시다.

**Made by jueunLee** · dlwndmsindiyo@gmail.com
