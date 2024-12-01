import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./reviewWrite.css";
import UpperNav from "../../component/upperNav/UpperNav";
import Footer from "../../component/footer/Footer";

export default function ReviewWrite() {
  const { restaurantId } = useParams(); // URL 파라미터에서 restaurantId 가져오기
  const [reviewText, setReviewText] = useState("");
  const [selectedRating, setSelectedRating] = useState(0); // 선택한 별점 상태
  const [restaurants, setRestaurants] = useState([]);
  const maxLength = 2000;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/restaurants.json");
        const restaurantData = await response.json();
        const restaurants2 = restaurantData.flatMap(
            (category) => category.items
        );

        setRestaurants(restaurants2);

      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchData();
  }, []);
  const restaurant = restaurants.find((r) => r.id === parseInt(restaurantId));

  if (!restaurant) {
    return (
      <div className="container review-write-page">
        <UpperNav title="리뷰" goBack={true} />
        <div className="content">
          <h3>존재하지 않는 식당입니다.</h3>
          <Footer />
        </div>
      </div>
    );
  }

  const handleTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating); // 선택한 별점 상태 업데이트
  };

  const handleSubmit = () => {
    const combinedData = new URLSearchParams({
      content: reviewText,
      rating: selectedRating
    }).toString();
    fetch(`/mypage/review/write/${restaurant.id}/add`,{
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: combinedData,
    })
    alert(
      `"${restaurant.name}"의 리뷰가 작성되었습니다! 별점: ${selectedRating}점`
    );
    navigate("/mypage/review");
  };

  return (
    <div className="container review-write-page">
      <UpperNav title="리뷰" goBack={true}/>
      <div className="content">
        {/* 별점 섹션 */}
        <div className="rating-section">
          <h3>{restaurant.name}</h3>
          <div className="stars">
            {Array(5)
              .fill()
              .map((_, i) => (
                <img
                  key={i}
                  src={
                    i < selectedRating
                      ? "/image/filled_star.svg"
                      : "/image/empty_star.svg"
                  }
                  alt={`${i + 1} stars`}
                  style={{ width: "40px", height: "40px", cursor: "pointer" }}
                  onClick={() => handleStarClick(i + 1)}
                />
              ))}
          </div>
        </div>

        {/* 리뷰 작성 섹션 */}
        <div className="review-section">
          <h4>후기를 작성해 보세요!</h4>
          <textarea
            className="review-textarea"
            placeholder={`맛있었던 메뉴에 대한 추천이나\n마음에 들었던 부분에 대해 리뷰해주세요! \n\n너무 심한 나쁜 말은 안돼요 :)`}
            maxLength={maxLength}
            value={reviewText}
            onChange={handleTextChange}
          />
          <div className="text-counter">
            {reviewText.length}/{maxLength}
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            작성 완료
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
