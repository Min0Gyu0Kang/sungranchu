import React, { useState, useEffect } from "react";
import "./Search.css";
import arrowIcon from "./arrow.png";
import Footer from "../../component/footer/Footer";

export default function Search() {
  const [searchCategories, setSearchCategories] = useState([]);
  const [originalCategories, setOriginalCategories] = useState([]); // 원본 데이터를 저장
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/restaurants.json");
        if (!response.ok) throw new Error("Failed to fetch JSON data");
        const data = await response.json();

        const updatedData = data.map((category) => ({
          ...category,
          currentPage: 0, // 각 카테고리의 현재 페이지 초기화
          items: category.items.map((item) => ({
            ...item,
            img: item.img.replace("public/", "/"), // 이미지 경로 수정
          })),
        }));

        setSearchCategories(updatedData);
        setOriginalCategories(updatedData); // 원본 데이터를 저장
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = () => {
    try {
      if (searchQuery.trim() === "") {
        // 검색어가 비어 있으면 원본 데이터를 복원
        setSearchCategories(originalCategories);
        setError(null);
        return;
      }

      // 검색어로 필터링
      const matchedCategories = originalCategories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.items.length > 0);

      if (matchedCategories.length === 0) {
        setError("검색 결과가 없습니다.");
      } else {
        setError(null);
      }

      setSearchCategories(matchedCategories);
    } catch (err) {
      console.error("Error during search:", err);
      setError("검색에 실패했습니다.");
      setSearchCategories([]);
    }
  };

  const handleNextPage = (categoryIndex) => {
    setSearchCategories((prevCategories) =>
      prevCategories.map((category, index) => {
        if (index === categoryIndex) {
          const totalPages = Math.ceil(category.items.length / 3);
          return {
            ...category,
            currentPage: (category.currentPage + 1) % totalPages,
          };
        }
        return category;
      })
    );
  };

  const handlePrevPage = (categoryIndex) => {
    setSearchCategories((prevCategories) =>
      prevCategories.map((category, index) => {
        if (index === categoryIndex) {
          const totalPages = Math.ceil(category.items.length / 3);
          return {
            ...category,
            currentPage:
              category.currentPage === 0
                ? totalPages - 1
                : category.currentPage - 1,
          };
        }
        return category;
      })
    );
  };

  const openPopup = (restaurant) => {
    setSelectedRestaurant({ ...restaurant, visited: false });
  };

  const closePopup = () => {
    setSelectedRestaurant(null);
  };

  const toggleVisitComplete = () => {
    if (selectedRestaurant) {
      setSelectedRestaurant((prev) => ({
        ...prev,
        visited: !prev.visited,
      }));
    }
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars > 0;

    return (
      <div className="popup-stars">
        {Array(filledStars)
          .fill()
          .map((_, index) => (
            <img
              key={`filled-${index}`}
              src="/image/filled_star.svg"
              alt="Filled Star"
              className="star-icon"
            />
          ))}
        {halfStar && (
          <img
            src="/image/half_star.svg"
            alt="Half Star"
            className="star-icon half-star"
          />
        )}
        {Array(totalStars - filledStars - (halfStar ? 1 : 0))
          .fill()
          .map((_, index) => (
            <img
              key={`empty-${index}`}
              src="/image/empty_star.svg"
              alt="Empty Star"
              className="star-icon"
            />
          ))}
      </div>
    );
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-icon" onClick={handleSearch}>
          🔍
        </button>
      </div>

      <div className="search-results">
        {error && <p className="error">{error}</p>}
        {searchCategories.map((category, index) => (
          <div key={index} className="search-category">
            <h3 className="category-title">{category.title}</h3>
            <div className="category-items-container">
              <button
                className="scroll-arrow left"
                onClick={() => handlePrevPage(index)}
              >
                &lt;
              </button>
              <div className="category-items">
                {category.items
                  .slice(category.currentPage * 3, category.currentPage * 3 + 3)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="category-item"
                      onClick={() => openPopup(item)}
                    >
                      <img src={item.img} alt={item.name} />
                      <p>{item.name}</p>
                    </div>
                  ))}
              </div>
              <button
                className="scroll-arrow right"
                onClick={() => handleNextPage(index)}
              >
                &gt;
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRestaurant && (
        <div className="popup">
          <div className="popup-content" style={{ position: "relative" }}>
            <button
              className="popup-close-button"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                color: "#888888",
                cursor: "pointer",
              }}
              onClick={closePopup}
            >
              ✖
            </button>
            <div className="popup-scrollable-content">
              <img
                src={selectedRestaurant.img}
                alt={selectedRestaurant.name}
                className="popup-image"
              />
              <h3 className="popup-title">{selectedRestaurant.name}</h3>
              <p className="popup-address">{selectedRestaurant.address}</p>
              {selectedRestaurant.reviews && (
                <div className="popup-reviews">
                  <h4>리뷰</h4>
                  {selectedRestaurant.reviews.map((review, index) => (
                    <div key={index} className="popup-review">
                      <p>{review.text}</p>
                      <div className="popup-stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="kingo-popup-buttons">
              <button
                className="popup-button"
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${selectedRestaurant.address}`,
                    "_blank"
                  )
                }
              >
                지도에서 보기
              </button>
              <button
                className="popup-button"
                style={{
                  backgroundColor: selectedRestaurant.visited
                    ? "#218838"
                    : "#CCCCCC",
                  color: "white",
                }}
                onClick={toggleVisitComplete}
              >
                {selectedRestaurant.visited ? "방문 완료" : "방문하지 않음"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
