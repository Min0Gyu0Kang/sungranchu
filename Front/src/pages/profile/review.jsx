import React from "react";
import "./profile.css"; // 기존 profile.css 스타일 사용
import UpperNav from "../../component/upperNav/UpperNav"; // 상단 네비게이션
import Footer from "../../component/footer/Footer"; // 하단 푸터
import { useNavigate } from "react-router-dom";

const filledStar = "/image/filled_star.svg";
const emptyStar = "/image/empty_star.svg";

export default function ReviewPage() {
  const navigate = useNavigate();
  const restaurants = [
    {
      id: 1,
      name: "청년다방 성균관대점",
      location: "경기도 수원시 장안구 서부로 2066",
      category: "양식, 한식",
      rating: 3.5,
      reviews: 8,
      image: "/image/filled_star.svg",
    },
    {
      id: 2,
      name: "홍콩반점 0410 강남점",
      location: "서울특별시 강남구 테헤란로 123",
      category: "중식",
      rating: 4.2,
      reviews: 15,
      image: "/image/empty_star.svg",
    },
    {
      id: 3,
      name: "청년다방 2",
      location: "경기도 수원시 장안구 서부로 2066",
      category: "양식, 한식",
      rating: 3.5,
      reviews: 8,
      image: "/image/filled_star.svg",
    },
    {
      id: 4,
      name: "홍콩반점 2",
      location: "서울특별시 강남구 테헤란로 123",
      category: "중식",
      rating: 4.2,
      reviews: 15,
      image: "/image/empty_star.svg",
    },
    {
      id: 5,
      name: "청년다방 3",
      location: "경기도 수원시 장안구 서부로 2066",
      category: "양식, 한식",
      rating: 3.5,
      reviews: 8,
      image: "/image/filled_star.svg",
    },
  ];

  const handleReviewClick = (restaurantId) => {
    navigate(`/mypage/review/write/${restaurantId}`);
  };

  return (
    <div className="container review-page">
      <UpperNav title="방문 식당 목록" goBack={true} />
      <div className="scrollable-content">
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
              <button
                className="profile-button"
                onClick={() => handleReviewClick(restaurant.id)}
              >
                리뷰 작성
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
