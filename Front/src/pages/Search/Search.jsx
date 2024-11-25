import React, { useRef } from 'react';
import './Search.css';
import arrowIcon from './arrow.png';
import Footer from '../../component/footer/Footer';

export default function Search() {
  const searchCategories = [
    {
      title: '# 한식',
      items: [{ name: '이종식당', img: './restaurant1.png' }],
    },
    {
        title: '# 일식',
        items: [{ name: '아늑', img: './restaurant1.png' }],
    },
    {
      title: '# 중식',
      items: [{ name: '아늑', img: './restaurant1.png' }],
    },
    {
      title: '# 양식',
      items: [{ name: '타코야노스 본점', img: './restaurant1.png' }],
    },
  ];

  // 가로 스크롤을 제어할 참조
  const categoryRef = useRef(null);

  const scroll = (direction) => {
    if (categoryRef.current) {
      const { scrollLeft, clientWidth } = categoryRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      categoryRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

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
            {/* 가로 스크롤 영역 */}
            <div className="category-items-container">
              <div className="category-items" ref={categoryRef}>
                {category.items.map((item, idx) => (
                  <div key={idx} className="category-item">
                    <img src={item.img} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
              <button
                className="scroll-arrow right"
                onClick={() => scroll('right')}
              >
                <img src={arrowIcon} alt="Scroll Right" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 네비게이션 */}
      <Footer />
    </div>
  );
}
