import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

import doremifasta from "./images/doremifasta.jpg";
import mudebohotdog from "./images/mudebohotdog.jpg";
import jungdeunchickenfeet from "./images/jungdeunchickenfeet.jpg";
import jeongseongtable from "./images/jeongseongtable.jpg";
import jeongjikyubu from "./images/jeongjikyubu.jpg";
import taekineclam from "./images/taekineclam.jpg";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isAnimating, setAnimating] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedKinggoPass, setSelectedKinggoPass] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]); // JSON 데이터를 저장
  const [map, setMap] = useState(null); // Kakao 지도 객체
  const [markers, setMarkers] = useState([]); // 지도에 표시된 마커 배열

  const navigate = useNavigate(); // useNavigate 훅 사용

  const moveToLocation = (restaurant) => {
    navigate("/map", { state: { restaurant } }); // 지도 페이지로 이동하며 데이터 전달
  };


  const itemsPerPage = 4; // 한 페이지에 보여줄 아이템 수
  const totalPages = Math.ceil(6 / itemsPerPage);

  
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_API_KEY&autoload=false`;
    mapScript.async = true;
  
    document.head.appendChild(mapScript);
  
    mapScript.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // Default center
          level: 5,
        };
        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap); // Kakao 지도 객체를 상태로 저장
      });
    };
  
    return () => document.head.removeChild(mapScript);
  }, []);


  const kinggoPassRestaurants = [
    {
      id: 1,
      name: "도레미파스타",
      image: doremifasta,
      address: "서울특별시 강남구 강남대로 123",
      services: ["2만원 이상 주문시 테이블 당 탄산음료 제공"],
      mapUrl: "https://maps.google.com/?q=37.5665,126.9780",
    },
    {
      id: 2,
      name: "무대뽀핫도그",
      image: mudebohotdog,
      address: "서울특별시 서초구 서초대로 45",
      services: ["결제 금액의 10% 할인"],
      mapUrl: "https://maps.google.com/?q=37.5670,126.9820",
    },
    {
      id: 3,
      name: "정든 닭발",
      image: jungdeunchickenfeet,
      address: "서울특별시 송파구 송파대로 67",
      services: ["대왕 달걀찜 제공"],
      mapUrl: "https://maps.google.com/?q=37.5650,126.9810",
    },
    {
      id: 4,
      name: "정성식탁",
      image: jeongseongtable,
      address: "서울특별시 강남구 테헤란로 152",
      services: ["테이블 당 음료수 or 에이드 제공"],
      mapUrl: "https://maps.google.com/?q=37.5680,126.9790",
    },
    {
      id: 5,
      name: "정직유부",
      image: jeongjikyubu,
      address: "서울특별시 마포구 마포대로 65",
      services: ["매장 취식 및 포장 주문시, 1인 1음료수 제공"],
      mapUrl: "https://maps.google.com/?q=37.5645,126.9765",
    },
    {
      id: 6,
      name: "택이네 조개전골",
      image: taekineclam,
      address: "서울특별시 은평구 연서로 23",
      services: ["테이블 당 음료수 1개 서비스"],
      mapUrl: "https://maps.google.com/?q=37.5675,126.9775",
    },
  ];

  const openKinggoPassPopup = (restaurant) => {
    setSelectedKinggoPass(restaurant);
  };

  const closeKinggoPassPopup = () => {
    setSelectedKinggoPass(null);
  };

  // 중복된 categories 선언 제거
  const categories = [
    { id: "# 한식", name: "한식", icon: korean },
    { id: "# 일식", name: "일식", icon: japanese },
    { id: "# 중식", name: "중식", icon: chinese },
    { id: "# 양식", name: "양식", icon: western },
    { id: "# 아시안", name: "아시안", icon: asian },
    { id: "# 해산물", name: "해산물", icon: seafood },
    { id: "# 고기", name: "고기", icon: meat },
    { id: "# 햄버거", name: "햄버거", icon: hamburger },
    { id: "# 베이커리", name: "베이커리", icon: bakery },
    { id: "# 분식", name: "분식", icon: snack },
  ];


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/restaurants.json");
        if (!response.ok) throw new Error("Failed to fetch JSON data");
        const data = await response.json();
        console.log("Fetched data:", data); // 데이터 확인
        setCategoriesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategories();
  }, []);
  
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null; // null 반환으로 명확히 표시
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1); // 소수점 한 자리까지 표시
  };
  
  

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
    const filteredRestaurants = categoriesData
      .filter((category) => selectedCategories.includes(category.title))
      .flatMap((category) => category.items);
  
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
        const selectedRestaurant = filteredRestaurants[randomIndex];
        selectedRestaurant.averageRating = calculateAverageRating(
          selectedRestaurant.reviews || []
        ); // 별점 계산
        setRandomRestaurant(selectedRestaurant); // 식당 설정
        setAnimating(false);
      }, 3000);
    } else {
      alert("선택된 카테고리에서 추천할 식당이 없습니다!");
      setRandomRestaurant(null); // 안전 처리
    }
  };
  
  
  

  const closePopup = () => {
    setPopupVisible(false);
    setRandomRestaurant(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? totalPages - 1 : prevPage - 1
    );
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
        <h3 className="recommendation-title"># 킹고패스</h3>

        <div className="recommendation-container">
          <button className="recommendation-nav prev" onClick={handlePrevPage}>
            &lt;
          </button>
          <div className="recommendation-list">
            {kinggoPassRestaurants
              .slice(
                currentPage * itemsPerPage,
                currentPage * itemsPerPage + itemsPerPage
              )
              .map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="recommendation-item"
                  onClick={() => openKinggoPassPopup(restaurant)}
                >
                  <img src={restaurant.image} alt={restaurant.name} />
                  <p>{restaurant.name}</p>
                </div>
              ))}
          </div>
          <button className="recommendation-nav next" onClick={handleNextPage}>
            &gt;
          </button>
        </div>
      </section>

      {/* 킹고패스 모달 */}
      {selectedKinggoPass && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-scrollable">
              <img
                src={selectedKinggoPass.image}
                alt={selectedKinggoPass.name}
                className="popup-image"
              />
              <h3 className="popup-title">{selectedKinggoPass.name}</h3>
              <p className="popup-address">{selectedKinggoPass.address}</p>
              <ul className="popup-services">
                {selectedKinggoPass.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div className="kingo-popup-buttons">
              <a
                href={selectedKinggoPass.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-map-link"
              >
                지도에서 보기
              </a>
              <button className="popup-map-link" onClick={closeKinggoPassPopup}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 팝업 */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            {isAnimating && currentRestaurant && (
              <>
                <img
                  src={currentRestaurant.img}
                  alt={currentRestaurant.name}
                  className="popup-image"
                />
                <h3 className="popup-title">{currentRestaurant.name}</h3>
                <p className="popup-category">{currentRestaurant.category}</p>
                <p className="popup-address">{currentRestaurant.address}</p>

              </>
            )}

            {!isAnimating && randomRestaurant && (
              <>
                <img
                  src={randomRestaurant.img}
                  alt={randomRestaurant.name}
                  className="popup-image"
                />
                <h3 className="popup-title">{randomRestaurant.name}</h3>
                <p className="popup-category">{randomRestaurant.category}</p>
                <p className="popup-address">{randomRestaurant.address}</p>

                <div className="popup-rating">
                  {randomRestaurant?.averageRating ? (
                    <>
                      {Array.from({ length: 5 }).map((_, i) => {
                        const rating = parseFloat(randomRestaurant.averageRating); // 실수형으로 변환
                        const filled = i + 1 <= rating; // 완전히 채워진 별
                        const halfFilled = i < rating && i + 1 > rating; // 반 채워진 별

                        return (
                          <img
                            key={i}
                            src={
                              filled
                                ? "/image/filled_star.svg" // 완전히 채워진 별
                                : halfFilled
                                ? "/image/half_star.svg" // 반 채워진 별
                                : "/image/empty_star.svg" // 빈 별
                            }
                            alt={`${i + 1} stars`}
                            style={{
                              width: "20px",
                              height: "20px",
                              margin: "0 2px",
                            }}
                          />
                        );
                      })}
                      <span style={{ marginLeft: "8px", fontSize: "14px", color: "#333" }}>
                        {randomRestaurant.averageRating} / 5
                      </span>
                    </>
                  ) : (
                    <span style={{ color: "#999", fontSize: "14px" }}>별점 없음</span>
                  )}
                </div>

                
                <div className="popup-buttons">
                  <button
                    className="popup-button"
                    onClick={() => moveToLocation(randomRestaurant)}
                  >
                    지도에서 보기
                  </button>
                  
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
