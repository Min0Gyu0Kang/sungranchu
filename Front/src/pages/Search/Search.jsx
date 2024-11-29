import React, { useRef } from 'react';
import './Search.css';
import arrowIcon from './arrow.png';
import Footer from '../../component/footer/Footer';

// Dynamically require all images from the "restaurant" directory
const images = require.context('./', false, /restaurant[1-9]|1[0-9]|20|21\.png$/);

export default function Search() {
    const searchCategories = [
        {
            "title": "# 한식",
            "items": [
                { "name": "히닭발", "img": images('./restaurant1.png') },
                { "name": "동네빈대떡", "img": images('./restaurant2.png') },
                { "name": "담은샤브칼국수", "img": images('./restaurant3.png') },
            ]
        },
        {
            "title": "# 일식",
            "items": [
                { "name": "하루엔소쿠", "img": images('./restaurant4.png') },
                { "name": "최고당돈가스", "img": images('./restaurant5.png') },
                { "name": "키와마루아지", "img": images('./restaurant6.png') },
            ]
        },
        {
            "title": "# 중식",
            "items": [
                { "name": "탕화쿵푸마라탕", "img": images('./restaurant7.png') },
                { "name": "수해복마라탕", "img": images('./restaurant8.png') },
                { "name": "샹츠마라", "img": images('./restaurant9.png') },
            ]
        },
        {
            "title": "# 양식",
            "items": [
                { "name": "오스테리아 우노", "img": images('./restaurant10.png') },
                { "name": "59쌀피자", "img": images('./restaurant11.png') },
                { "name": "롤링파스타", "img": images('./restaurant12.png') },
            ]
        },
        {
            "title": "# 고기",
            "items": [
                { "name": "보리네 주먹고기", "img": images('./restaurant13.png') },
                { "name": "육식", "img": images('./restaurant14.png') },
                { "name": "성대곱창", "img": images('./restaurant15.png') },
            ]
        },
        {
            "title": "# 햄버거",
            "items": [
                { "name": "맥도날드 수원성균관대점", "img": images('./restaurant16.png') },
                { "name": "롯데리아 수원성대점", "img": images('./restaurant17.png') },
                { "name": "사우스스트릿", "img": images('./restaurant18.png') },
            ]
        },
        {
            "title": "# 베이커리",
            "items": [
                { "name": "플렁드", "img": images('./restaurant19.png') },
                { "name": "파리바게뜨 성균관대점", "img": images('./restaurant20.png') },
                { "name": "스타벅스", "img": images('./restaurant21.png') },
            ]
        }
    ];

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
            <header className="search-header">
                <h2 className="search-title">검색 페이지</h2>
            </header>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="레스토랑 이름을 입력하세요."
                    className="search-input"
                />
                <button className="search-icon">🔍</button>
            </div>

            <div className="search-results">
                {searchCategories.map((category, index) => (
                    <div key={index} className="search-category">
                        <h3 className="category-title">{category.title}</h3>
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

            <Footer />
        </div>
    );
}
