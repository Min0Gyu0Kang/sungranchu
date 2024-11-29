import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import "./Footer.css";

import homeIcon from "./home.png";
import mapIcon from "./map.png";
import searchIcon from "./search.png";
import profileIcon from "./profile.png";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer">
      <div
        className={`nav-item ${location.pathname === "/home" ? "active" : ""}`}
        onClick={() => handleNavigation("/home")}
      >
        <img src={homeIcon} alt="홈" />
        <p>홈</p>
      </div>
      <div
        className={`nav-item ${location.pathname === "/map" ? "active" : ""}`}
        onClick={() => handleNavigation("/map")}
      >
        <img src={mapIcon} alt="지도" />
        <p>지도</p>
      </div>
      <div
        className={`nav-item ${
          location.pathname === "/search" ? "active" : ""
        }`}
        onClick={() => handleNavigation("/search")}
      >
        <img src={searchIcon} alt="검색" />
        <p>검색</p>
      </div>
      <div
        className={`nav-item ${
          location.pathname === "/mypage" ? "active" : ""
        }`}
        onClick={() => handleNavigation("/mypage")}
      >
        <img src={profileIcon} alt="프로필" />
        <p>프로필</p>
      </div>
    </footer>
  );
}
