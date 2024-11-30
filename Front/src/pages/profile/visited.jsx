import React, { useEffect, useState } from "react";
import "./profile.css"; // 기존 profile.css 스타일 사용
import UpperNav from "../../component/upperNav/UpperNav"; // 상단 네비게이션
import Footer from "../../component/footer/Footer"; // 하단 푸터
import { useNavigate } from "react-router-dom";

const filledStar = "/image/filled_star.svg";
const emptyStar = "/image/empty_star.svg";

export default function VisitedPage() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]); // 방문 식당 목록
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchVisitedRestaurants = async () => {
      try {
        // 1. 백엔드에서 방문한 식당 이름만 가져오기
        const response = await fetch("/mypage/review/info", {
          method: "GET",
          credentials: "include", // 쿠키 포함 (Authentication 사용 시)
        });

        if (!response.ok)
          throw new Error("Failed to fetch visited restaurants");
        const visitedRestaurantNames = await response.json();

        // 2. JSON 파일에서 방문한 식당 정보 찾기
        const jsonResponse = await fetch("/restaurants.json");
        if (!jsonResponse.ok) throw new Error("Failed to load JSON file");
        const restaurantData = await jsonResponse.json();

        // 3. 방문 식당 이름과 JSON 데이터 매칭
        const matchedRestaurants = restaurantData.filter((restaurant) =>
          visitedRestaurantNames.some(
            (visited) => visited.name === restaurant.name
          )
        );

        setRestaurants(matchedRestaurants); // 상태 업데이트
        setError(null);
      } catch (err) {
        console.error("Error:", err);
        setError("식당 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchVisitedRestaurants();
  }, []);

  const handleReviewClick = (restaurantId) => {
    navigate(`/mypage/review/write/${restaurantId}`);
  };

  return (
    <div className="container review-page">
      <UpperNav title="방문 식당 기록" goBack={true} />
      <div className="scrollable-content">
        {error && <p className="error">{error}</p>}
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="profile-card">
            {/* 왼쪽: 식당 이미지 */}
            <div className="profile-left">
              <img
                className="profile-image"
                src={restaurant.image}
                alt={restaurant.name}
              />
            </div>

            {/* 오른쪽: 식당 정보 */}
            <div className="profile-right">
              <div className="profile-main-text">{restaurant.name}</div>
              <div className="profile-sub-text">
                <span
                  className="left-text"
                  style={{ display: "flex", gap: "4px" }}
                >
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < Math.floor(restaurant.rating)
                            ? filledStar
                            : emptyStar
                        }
                        alt="star"
                        style={{ width: "16px", height: "16px" }} // 별 크기 조정
                      />
                    ))}
                </span>
                <span
                  className="right-text"
                  style={{ fontSize: "14px", color: "#666" }}
                >
                  ({restaurant.reviews})
                </span>
              </div>
              {/* 주소와 카테고리 */}
              <div
                style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}
              >
                <p style={{ margin: "0", lineHeight: "1.5" }}>
                  {restaurant.location}
                </p>
                <p style={{ margin: "0", lineHeight: "1.5" }}>
                  {restaurant.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
