import React, { useState } from "react";

const KakaoMap = () => {
  const [keyword, setKeyword] = useState("강남역 점심");
  const [places, setPlaces] = useState([]);

  const searchPlaces = () => {
    if (!window.kakao || !window.kakao.maps) {
      alert("카카오 맵 스크립트가 로드되지 않았습니다.");
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    // 키워드로 장소 검색
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // data 배열에 주변 식당 정보(식당 이름, 주소 등)가 담겨 옵니다.
        setPlaces(data);
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>카카오맵 연동 점심 룰렛</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="지역 + 맛집 (예: 역삼동 점심)"
      />
      <button onClick={searchPlaces}>맛집 불러오기</button>

      <ul>
        {places.map((place) => (
          <li key={place.id}>
            <strong>{place.place_name}</strong> ({place.category_name})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KakaoMap;
