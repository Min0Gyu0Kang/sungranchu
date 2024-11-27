import React, { useState } from "react";
import "./Home.css";
import Footer from "../../component/footer/Footer";

// 카테고리 아이콘 및 추천 이미지 import
import korean from "./korean.png";
import japanese from "./japanese.png";
import chinese from "./chinese.png";
import western from "./western.png";
import asian from "./asian.png";
import seafood from "./seafood.png";
import meat from "./meat.png";
import hamburger from "./hamburger.png";
import bakery from "./bakery.png";
import snack from "./snack.png";
import restaurant1 from "./restaurant1.png";
import restaurant2 from "./restaurant2.png";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isAnimating, setAnimating] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  const categories = [
    { id: "korean", name: "한식", icon: korean },
    { id: "japanese", name: "일식", icon: japanese },
    { id: "chinese", name: "중식", icon: chinese },
    { id: "western", name: "양식", icon: western },
    { id: "asian", name: "아시안", icon: asian },
    { id: "seafood", name: "해산물", icon: seafood },
    { id: "meat", name: "고기", icon: meat },
    { id: "hamburger", name: "햄버거", icon: hamburger },
    { id: "bakery", name: "베이커리", icon: bakery },
    { id: "snack", name: "분식", icon: snack },
  ];

  const restaurants = [
    {
      id: 1,
      name: "아늑",
      category: "korean",
      rating: 4.5,
      address: "서울특별시 강남구 테헤란로 123",
      image: restaurant1,
    },
    {
      id: 2,
      name: "오스테리아우노",
      category: "western",
      rating: 4.0,
      address: "서울특별시 서초구 반포대로 45",
      image: restaurant2,
    },
    {
      id: 3,
      name: "일식당",
      category: "japanese",
      rating: 3.8,
      address: "서울특별시 송파구 송파대로 55",
      image: restaurant1,
    },
    {
      id: 4,
      name: "중식당",
      category: "chinese",
      rating: 4.2,
      address: "서울특별시 동대문구 천호대로 100",
      image: restaurant2,
    },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const handleDrawClick = () => {
    const filteredRestaurants = restaurants.filter((restaurant) =>
      selectedCategories.includes(restaurant.category)
    );

    if (filteredRestaurants.length > 0) {
      setPopupVisible(true);
      setAnimating(true);
      let animationIndex = 0;

      const interval = setInterval(() => {
        setCurrentRestaurant(
          filteredRestaurants[animationIndex % filteredRestaurants.length]
        );
        animationIndex++;
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        const randomIndex = Math.floor(
          Math.random() * filteredRestaurants.length
        );
        setRandomRestaurant(filteredRestaurants[randomIndex]);
        setAnimating(false);
      }, 3000);
    } else {
      alert("선택된 카테고리에서 추천할 식당이 없습니다!");
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    setRandomRestaurant(null);
  };

  return (
    <div className="home-container">
      <header className="header">
        <h2 className="title">랜덤 맛집 뽑기</h2>
        <p className="subtitle">
          원하는 카테고리를 모두 선택 후, 랜덤으로 식당을 추천 받을 수 있습니다.
        </p>
      </header>

      <div className="category-container">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category ${
              selectedCategories.includes(category.id) ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <img src={category.icon} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      <button className="draw-button" onClick={handleDrawClick}>
        뽑기
      </button>

      {/* 킹고패스 섹션 */}
      <section className="recommendation">
        <h3 className="recommendation-title"> # 킹고패스</h3>
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

      {/* 팝업 */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            {isAnimating && currentRestaurant && (
              <>
                <img
                  src={currentRestaurant.image}
                  alt={currentRestaurant.name}
                  className="popup-image"
                />
                <h3 className="popup-title">{currentRestaurant.name}</h3>
                <p className="popup-category">{currentRestaurant.category}</p>
                <p className="popup-address">{currentRestaurant.address}</p>
                <div className="popup-rating">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < currentRestaurant.rating
                            ? "/image/filled_star.svg"
                            : "/image/empty_star.svg"
                        }
                        alt={`${i + 1} stars`}
                        style={{
                          width: "20px",
                          height: "20px",
                          margin: "0 2px",
                        }}
                      />
                    ))}
                </div>
              </>
            )}

            {!isAnimating && randomRestaurant && (
              <>
                <img
                  src={randomRestaurant.image}
                  alt={randomRestaurant.name}
                  className="popup-image"
                />
                <h3 className="popup-title">{randomRestaurant.name}</h3>
                <p className="popup-category">{randomRestaurant.category}</p>
                <p className="popup-address">{randomRestaurant.address}</p>
                <div className="popup-rating">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < randomRestaurant.rating
                            ? "/image/filled_star.svg"
                            : "/image/empty_star.svg"
                        }
                        alt={`${i + 1} stars`}
                        style={{
                          width: "20px",
                          height: "20px",
                          margin: "0 2px",
                        }}
                      />
                    ))}
                </div>
                <div className="popup-buttons">
                  <button className="popup-button" onClick={closePopup}>
                    확인
                  </button>
                  <button className="popup-button" onClick={handleDrawClick}>
                    다시 뽑기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
