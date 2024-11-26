import "./Footer.css";
import { useNavigate } from "react-router-dom";

import homeIcon from "./home.png";
import mapIcon from "./map.png";
import searchIcon from "./search.png";
import profileIcon from "./profile.png";

export default function Footer() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleProfileClick = () => {
    navigate("/mypage");
  };

  const handleMapClick = () => {
    navigate("/map");
  };

  return (
    <footer className="footer">
      <div className="nav-item" onClick={handleHomeClick}>
        <img src={homeIcon} alt="홈" />
        <p>홈</p>
      </div>
      <div className="nav-item" onClick={handleMapClick}>
        <img src={mapIcon} alt="지도" />
        <p>지도</p>
      </div>
      <div className="nav-item" onClick={handleSearchClick}>
        <img src={searchIcon} alt="검색" />
        <p>검색</p>
      </div>
      <div className="nav-item" onClick={handleProfileClick}>
        <img src={profileIcon} alt="프로필" />
        <p>프로필</p>
      </div>
    </footer>
  );
}
