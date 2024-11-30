import React, { useEffect, useState } from "react";
import "./profile.css"; // 기존 profile.css 스타일 사용
import UpperNav from "../../component/upperNav/UpperNav"; // 상단 네비게이션
import Footer from "../../component/footer/Footer"; // 하단 푸터
import { useNavigate } from "react-router-dom";

const filledStar = "/image/filled_star.svg";
const emptyStar = "/image/empty_star.svg";

export default function ReviewPage() {
  const [visitedRestaurants, setVisitedRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitedData = async () => {
      try {
        // 방문한 식당 데이터를 백엔드에서 가져옴
        const response = await fetch("/mypage/review/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 인증 정보 포함
        });

        if (!response.ok) {
          throw new Error("Failed to fetch visited restaurant data.");
        }

        const restaurants = await response.json();

        // 이미지 경로 수정 및 데이터 준비
        const updatedRestaurants = restaurants.map((restaurant) => ({
          ...restaurant,
          img: `/${restaurant.img}`, // public 디렉토리는 자동으로 매핑됨
          reviews: restaurant.reviews || [], // 리뷰 데이터가 없는 경우 빈 배열
        }));

        setVisitedRestaurants(updatedRestaurants);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchVisitedData();
  }, []);

  return (
    <div className="container review-page">
      <UpperNav title="방문 식당 기록" goBack={true} />
      <div className="scrollable-content">
        {visitedRestaurants.map((restaurant, index) => (
          <div key={index} className="profile-card">
            {/* 왼쪽: 식당 이미지 */}
            <div className="profile-left">
              <img
                className="profile-image"
                src={restaurant.img} // 경로는 이미 조정됨
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
                          i <
                          Math.floor(
                            restaurant.reviews.reduce(
                              (sum, review) => sum + review.rating,
                              0
                            ) / restaurant.reviews.length
                          )
                            ? filledStar
                            : emptyStar
                        }
                        alt="star"
                        style={{ width: "16px", height: "16px" }}
                      />
                    ))}
                </span>
                <span
                  className="right-text"
                  style={{ fontSize: "14px", color: "#666" }}
                >
                  ({restaurant.reviews.length})
                </span>
              </div>
              {/* 주소와 카테고리 */}
              <div
                style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}
              >
                <p style={{ margin: "0", lineHeight: "1.5" }}>
                  {restaurant.address}
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
