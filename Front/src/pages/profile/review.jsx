import React, {useEffect, useState} from "react";
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
        const response = await fetch("/mypage/review/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch visited restaurant data.");
        }

        const restaurantIds = await response.json();
        console.log("Fetched restaurant IDs:", restaurantIds);

        // restaurantIds에서 id 값만 추출
        const ids = restaurantIds.map((restaurant) => restaurant.id);
        console.log("Extracted IDs:", ids);

        // JSON 데이터를 가져와 필터링
        const response2 = await fetch("/restaurants.json");
        const restaurantData = await response2.json();

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

        // 모든 items를 병합하여 하나의 배열로 만듦
        const allRestaurants = restaurantData.flatMap(
            (category) => category.items
        );

        // ids 배열과 매칭
        const matchedRestaurants = allRestaurants.filter((item) =>
            ids.includes(item.id)
        );

        // 이미지 경로 추가
        const updatedRestaurants = matchedRestaurants.map((restaurant) => ({
          ...restaurant,
          img: `/image/${restaurant.id}.png`, // id를 기반으로 이미지 경로 생성
          category: restaurantIds.find((item) => item.id === restaurant.id).category,
        }));
        console.log(`restaurant.id: {restaurant.id}`);
        reviewData.forEach((review)=>{
          const restaurant = updatedRestaurants.find((r) => r.id === review.id);
          if (restaurant) {
            restaurant.reviews.push({ text: review.content, rating: review.rating });
          }
        });

        setVisitedRestaurants(updatedRestaurants);

      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchVisitedData();
  }, []);
  const handleReviewClick = (restaurantId) => {
    navigate(`/mypage/review/write/${restaurantId}`);
  };

  return (
    <div className="container review-page">
      <UpperNav title="리뷰 작성" goBack={true} />
      <div className="scrollable-content">
        {visitedRestaurants.map((restaurant, index) => (
          <div key={index} className="profile-card">
            {/* 왼쪽: 식당 이미지 */}
            <div className="profile-left">
              <img
                className="profile-image"
                src={restaurant.img}
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
                        style={{ width: "16px", height: "16px" }} // 별 크기 조정
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
