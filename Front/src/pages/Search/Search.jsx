import React, { useState, useEffect } from "react";
import "./Search.css";
import Footer from "../../component/footer/Footer";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 훅


export default function Search() {
  const [searchCategories, setSearchCategories] = useState([]);
  const [originalCategories, setOriginalCategories] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null); // 지도 객체 상태
  const [marker, setMarker] = useState(null); // 마커 상태 추가
  const navigate = useNavigate();

  const moveToMapPage = (restaurant) => {
    navigate("/map", { state: { restaurant } });
  };

  // 방문 상태를 API로 가져오기
  const fetchVisitStatus = async (data) => {
    try {
      const response = await fetch("/mypage/review/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch visit status");

      const visitedRestaurants = await response.json();

      // 방문 상태를 각 레스토랑 ID에 매핑
      const visitedRestaurantIds = new Set(
        visitedRestaurants.map((restaurant) => restaurant.id)
      );

      return data.map((category) => ({
        ...category,
        items: category.items.map((item) => ({
          ...item,
          visited: visitedRestaurantIds.has(item.id), // 방문 상태 매핑
        })),
      }));
    } catch (error) {
      console.error("Error fetching visit status:", error);
      return data; // 에러 발생 시 원본 데이터를 그대로 반환
    }
  };

  const addVisit = async () => {
    try {
      // 추가할 데이터 구성
      const newVisitData = {
        id: selectedRestaurant.id, // 레스토랑 ID
        name: selectedRestaurant.name,
        address: selectedRestaurant.address,
      };

      // 백엔드에 새 데이터 추가 요청
      const response = await fetch(`/restaurants/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVisitData),
      });

      if (!response.ok) throw new Error("Failed to add visit");

      console.log("Visit added:", await response.json());
      alert("새로운 방문 정보가 추가되었습니다.");
    } catch (error) {
      console.error("Error adding visit:", error);
      alert("방문 정보를 추가하는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/restaurants.json");
        if (!response.ok) throw new Error("Failed to fetch JSON data");
        const data = await response.json();
        //리뷰 가져오기
        const response3 = await fetch("/allReview", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response3.ok) {
          throw new Error("Failed to fetch review data.");
        }
        const reviewData = await response3.json();
        const updatedData = data.map((category) => ({
          ...category,
          currentPage: 0,
          items: category.items.map((item) => ({
            ...item,
            img: item.img.replace("public/", "/"),
          })),
        }));
        const restaurants = data.flatMap(
            (category) => category.items
        );
        reviewData.forEach((review)=>{
          const restaurant = restaurants.find((r) => r.id === review.id);
          if (restaurant) {
            restaurant.reviews.push({ text: review.content, rating: review.rating });
          }
        });
        // 방문 상태를 데이터에 반영
        const dataWithVisitStatus = await fetchVisitStatus(updatedData);
        setSearchCategories(dataWithVisitStatus);
        setOriginalCategories(dataWithVisitStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false`;
    mapScript.async = true;
  
    document.head.appendChild(mapScript);
  
    mapScript.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: selectedRestaurant
            ? new window.kakao.maps.LatLng(selectedRestaurant.lat, selectedRestaurant.lng)
            : new window.kakao.maps.LatLng(37.2937, 126.9743), // 기본 위치
          level: 5,
        };
  
        const kakaoMap = new window.kakao.maps.Map(container, options);
  
        // selectedRestaurant가 있을 경우 해당 위치에만 마커 표시
        if (selectedRestaurant) {
          const markerPosition = new window.kakao.maps.LatLng(
            selectedRestaurant.lat,
            selectedRestaurant.lng
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(kakaoMap);
  
          // InfoWindow 추가
          const infoWindowContent = `
            <div style="padding:5px;font-size:12px;">
              <strong>${selectedRestaurant.name}</strong><br>
              ${selectedRestaurant.address}
            </div>
          `;
          const infoWindow = new window.kakao.maps.InfoWindow({
            content: infoWindowContent,
          });
          infoWindow.open(kakaoMap, marker);
        }
  
        setMap(kakaoMap); // 지도 객체 저장
      });
    };
  
    return () => document.head.removeChild(mapScript);
  }, [selectedRestaurant]); // selectedRestaurant를 의존성으로 추가


  useEffect(() => {
    if (map && selectedRestaurant) {
      // 이전 마커 제거
      if (marker) {
        marker.setMap(null);
      }
  
      // 새로운 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(
        selectedRestaurant.lat,
        selectedRestaurant.lng
      );
      const newMarker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      newMarker.setMap(map);
  
      // InfoWindow 추가
      const infoWindowContent = `
        <div style="padding:5px;font-size:12px;">
          <strong>${selectedRestaurant.name}</strong><br>
          ${selectedRestaurant.address}
        </div>
      `;
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: infoWindowContent,
      });
      infoWindow.open(map, newMarker);
  
      // 상태 업데이트
      setMarker(newMarker);
    }
  }, [map, selectedRestaurant]);
  
  
  const handleSearch = () => {
    try {
      if (searchQuery.trim() === "") {
        setSearchCategories(originalCategories);
        setError(null);
        return;
      }

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
    setSelectedRestaurant({ ...restaurant });
  };

  const closePopup = () => {
    setSelectedRestaurant(null);
  };

  const toggleVisitComplete = async () => {
    if (!selectedRestaurant) return;

    const updatedVisitedState = !selectedRestaurant.visited;

    try {
      // 방문 상태를 백엔드에 업데이트
      const response = await fetch(`/${selectedRestaurant.id}/visit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 404) {
          // 데이터가 없는 경우 추가 요청
          const confirmAdd = window.confirm(
            "해당 식당 정보가 없습니다. 새로 추가하시겠습니까?"
          );
          if (confirmAdd) {
            await addVisit(); // 새 데이터 추가
            // 방문 상태 다시 저장 시도
            await fetch(`/${selectedRestaurant.id}/visit`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
          }
        } else {
          throw new Error("Failed to save visit");
        }
      }

      // UI 상태 업데이트
      setSelectedRestaurant((prev) => ({
        ...prev,
        visited: updatedVisitedState,
      }));

      setSearchCategories((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          items: category.items.map((item) =>
            item.id === selectedRestaurant.id
              ? { ...item, visited: updatedVisitedState }
              : item
          ),
        }))
      );
    } catch (error) {
      console.error("Error updating visit status:", error);
      alert("방문 상태를 업데이트하는 데 실패했습니다.");
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
                onClick={() => moveToMapPage(selectedRestaurant)}
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
