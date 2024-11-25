import React, { useState } from 'react';
import './Home.css';
import Footer from '../../component/footer/Footer'

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
import restaurant1 from './restaurant1.png';
import restaurant2 from './restaurant2.png';

export default function Home() {

  // 상태 관리: 선택된 카테고리 배열
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        // 이미 선택된 경우 해제
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        // 선택되지 않은 경우 추가
        return [...prevSelected, categoryId];
      }
    });
  };

  // 카테고리 데이터 배열
  const categories = [
    { id: 'korean', name: '한식', icon: korean },
    { id: 'japanese', name: '일식', icon: japanese },
    { id: 'chinese', name: '중식', icon: chinese },
    { id: 'western', name: '양식', icon: western },
    { id: 'asian', name: '아시안', icon: asian },
    { id: 'seafood', name: '해산물', icon: seafood },
    { id: 'meat', name: '고기', icon: meat },
    { id: 'hamburger', name: '햄버거', icon: hamburger },
    { id: 'bakery', name: '베이커리', icon: bakery },
    { id: 'snack', name: '분식', icon: snack },
  ];

  return (
    <div className="home-container">
      {/* 상단 제목 */}
      <header className="header">
        <h2 className="title">랜덤 맛집 뽑기</h2>
        <p className="subtitle">원하는 카테고리를 모두 선택 후, 랜덤으로 식당을 추천 받을 수 있습니다.</p>
      </header>

      {/* 카테고리 아이콘 영역 */}
      <div className="category-container">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <img src={category.icon} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
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
      <Footer />
    </div>
  );
}
