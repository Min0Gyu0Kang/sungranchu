import React from 'react';
import './Search.css';
import homeIcon from './home.png';
import mapIcon from './map.png';
import searchIcon from './search.png';
import profileIcon from './profile.png';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // 경로 이동
  };

  const searchCategories = [
    {
      title: '# 한국인',
      items: [
        { name: '이종식당', img: './restaurant1.png' },
        { name: '장군순대국', img: './restaurant2.png' },
      ],
    },
    {
      title: '# 이탈리아 사람',
      items: [
        { name: '아늑', img: './restaurant3.png' },
        { name: '오스테리아우노', img: './restaurant4.png' },
      ],
    },
    {
      title: '# 멕시코 인',
      items: [
        { name: '타코야노스 본점', img: './restaurant5.png' },
        { name: 'Crack Taco Shop', img: './restaurant6.png' },
      ],
    },
  ];

  return (
    <div className="search-container">
      {/* 상단 헤더 */}
      <header className="search-header">
        <h2 className="search-title">검색 페이지</h2>
      </header>

      {/* 검색창 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="레스토랑 이름을 입력하세요."
          className="search-input"
        />
        <button className="search-icon">🔍</button>
      </div>

      {/* 검색 결과 리스트 */}
      <div className="search-results">
        {searchCategories.map((category, index) => (
          <div key={index} className="search-category">
            <h3 className="category-title">{category.title}</h3>
            <div className="category-items">
              {category.items.map((item, idx) => (
                <div key={idx} className="category-item">
                  <img src={item.img} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 네비게이션 */}
      <footer className="footer">
        <div className="nav-item" onClick={() => handleNavigation('/home')}>
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
        <div className="nav-item" onClick={() => handleNavigation('/mypage')}>
          <img src={profileIcon} alt="프로필" />
          <p>프로필</p>
        </div>
      </footer>
    </div>
  );
}
