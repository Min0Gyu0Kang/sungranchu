import React from 'react';
import './Home.css';

// 카테고리 아이콘 및 추천 이미지 import
import korean from './korean.png';
import japanese from './japanese.png';
import chinese from './chinese.png';
import western from './western.png';
import asian from './asian.png';
import seafood from './seafood.png';
import meat from './meat.png';
import hamburger from './hamburger.png';
import bakery from './bakery.png';
import snack from './snack.png';
import homeIcon from './home.png';
import mapIcon from './map.png';
import searchIcon from './search.png';
import profileIcon from './profile.png';
import restaurant1 from './restaurant1.png';
import restaurant2 from './restaurant2.png';

export default function Home() {
  return (
    <div className="home-container">
      {/* 상단 제목 */}
      <header className="header">
        <h2 className="title">랜덤 맛집 뽑기</h2>
        <p className="subtitle">원하는 카테고리를 모두 선택 후, 랜덤으로 식당을 추천 받을 수 있습니다.</p>
      </header>

      {/* 카테고리 아이콘 영역 */}
      <div className="category-container">
        <div className="category">
          <img src={korean} alt="한식" />
          <p>한식</p>
        </div>
        <div className="category">
          <img src={japanese} alt="일식" />
          <p>일식</p>
        </div>
        <div className="category">
          <img src={chinese} alt="중식" />
          <p>중식</p>
        </div>
        <div className="category">
          <img src={western} alt="양식" />
          <p>양식</p>
        </div>
        <div className="category">
          <img src={asian} alt="아시안" />
          <p>아시안</p>
        </div>
        <div className="category">
          <img src={seafood} alt="해산물" />
          <p>해산물</p>
        </div>
        <div className="category">
          <img src={meat} alt="고기" />
          <p>고기</p>
        </div>
        <div className="category">
          <img src={hamburger} alt="햄버거" />
          <p>햄버거</p>
        </div>
        <div className="category">
          <img src={bakery} alt="베이커리" />
          <p>베이커리</p>
        </div>
        <div className="category">
          <img src={snack} alt="분식" />
          <p>분식</p>
        </div>
      </div>

      {/* 뽑기 버튼 */}
      <button className="draw-button">뽑기</button>

      {/* 추천 리스트 */}
      <section className="recommendation">
        <h3 className="recommendation-title">킹고패스</h3>
        <div className="recommendation-container">
          <div className="recommendation-item">
            <img src={restaurant1} alt="Restaurant 1" />
            <p>아늑</p>
          </div>
          <div className="recommendation-item">
            <img src={restaurant2} alt="Restaurant 2" />
            <p>오스테리아우노</p>
          </div>
        </div>
      </section>

      {/* 하단 네비게이션 */}
      <footer className="footer">
        <div className="nav-item">
          <img src={homeIcon} alt="홈" />
          <p>홈</p>
        </div>
        <div className="nav-item">
          <img src={mapIcon} alt="지도" />
          <p>지도</p>
        </div>
        <div className="nav-item">
          <img src={searchIcon} alt="검색" />
          <p>검색</p>
        </div>
        <div className="nav-item">
          <img src={profileIcon} alt="프로필" />
          <p>프로필</p>
        </div>
      </footer>
    </div>
  );
}
