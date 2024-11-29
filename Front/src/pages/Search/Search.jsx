import React, { useState, useRef } from "react";
import "./Search.css";
import arrowIcon from "./arrow.png";
import Footer from "../../component/footer/Footer";

// Dynamically require all images from the "restaurant" directory
const images = require.context(
  "./",
  false,
  /restaurant[1-9]|1[0-9]|20|21\.png$/
);

export default function Search() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // 팝업에 표시할 선택된 식당
  const categoryRef = useRef(null);

  const searchCategories = [
    {
      title: "# 한식",
      items: [
        {
          name: "히닭발",
          img: images("./restaurant1.png"),
          address: "서울특별시 강남구 히닭발길 1",
          services: ["매콤한 닭발 요리", "무료 밑반찬 제공"],
          reviews: [
            {
              text: "매운맛이 입안을 확 사로잡는 닭발! 서비스도 훌륭해요.",
              rating: 4.5,
            },
            {
              text: "매콤하지만 중독성 있는 맛! 다음에도 방문하고 싶어요.",
              rating: 4.2,
            },
          ],
        },
        {
          name: "동네빈대떡",
          img: images("./restaurant2.png"),
          address: "서울특별시 서초구 빈대떡로 15",
          services: ["전통 빈대떡", "전통주와 함께 즐기기"],
          reviews: [
            {
              text: "바삭한 빈대떡과 함께하는 전통주의 조화가 최고입니다.",
              rating: 4.3,
            },
            {
              text: "고소한 맛이 일품이에요. 전통주와 잘 어울립니다.",
              rating: 4.0,
            },
          ],
        },
        {
          name: "담은샤브칼국수",
          img: images("./restaurant3.png"),
          address: "서울특별시 송파구 샤브로 25",
          services: ["칼국수 샤브샤브", "계절 한정 요리 제공"],
          reviews: [
            {
              text: "따뜻하고 깔끔한 맛! 가족 모임에도 좋습니다.",
              rating: 4.7,
            },
            {
              text: "샤브샤브와 칼국수의 조합이 훌륭합니다.",
              rating: 4.5,
            },
          ],
        },
      ],
    },
    {
      title: "# 일식",
      items: [
        {
          name: "하루엔소쿠",
          img: images("./restaurant4.png"),
          address: "서울특별시 종로구 소쿠로 3",
          services: ["정통 일본 가정식", "저녁 코스 요리"],
          reviews: [
            {
              text: "정갈한 일본 가정식을 서울에서 느낄 수 있는 곳!",
              rating: 4.8,
            },
            {
              text: "코스 요리가 훌륭하며 직원들도 친절합니다.",
              rating: 4.7,
            },
          ],
        },
        {
          name: "최고당돈가스",
          img: images("./restaurant5.png"),
          address: "서울특별시 중구 돈가스로 7",
          services: ["수제 돈가스", "점심 세트 메뉴 할인"],
          reviews: [
            {
              text: "겉은 바삭, 속은 촉촉한 돈가스의 끝판왕!",
              rating: 4.6,
            },
            {
              text: "점심 세트 메뉴가 가성비 최고입니다.",
              rating: 4.4,
            },
          ],
        },
        {
          name: "키와마루아지",
          img: images("./restaurant6.png"),
          address: "서울특별시 용산구 아지길 8",
          services: ["사시미와 스시", "프리미엄 재료 사용"],
          reviews: [
            {
              text: "최고급 재료를 활용한 사시미와 스시가 정말 맛있어요.",
              rating: 4.9,
            },
            {
              text: "고급스러운 분위기와 맛있는 음식!",
              rating: 4.8,
            },
          ],
        },
      ],
    },
    {
      title: "# 중식",
      items: [
        {
          name: "탕화쿵푸마라탕",
          img: images("./restaurant7.png"),
          address: "서울특별시 강남구 마라로 11",
          services: ["다양한 매운맛 선택 가능", "주문형 재료 추가"],
          reviews: [
            {
              text: "매운맛 조절이 가능해서 초보자도 도전하기 좋아요!",
              rating: 4.4,
            },
            {
              text: "마라탕 국물이 진하고 재료가 신선했어요.",
              rating: 4.3,
            },
          ],
        },
        {
          name: "수해복마라탕",
          img: images("./restaurant8.png"),
          address: "서울특별시 광진구 복로 19",
          services: ["매운 마라탕", "중국식 전통 요리"],
          reviews: [
            {
              text: "깊은 맛의 국물이 일품입니다. 꼭 재방문할 예정!",
              rating: 4.5,
            },
            {
              text: "중국식 전통 마라탕이 맛있고 분위기도 좋았습니다.",
              rating: 4.2,
            },
          ],
        },
        {
          name: "샹츠마라",
          img: images("./restaurant9.png"),
          address: "서울특별시 서대문구 샹츠로 21",
          services: ["마라 요리 전문점", "중국 수입 식재료 사용"],
          reviews: [
            {
              text: "현지에서 먹는 듯한 정통 마라 요리를 즐길 수 있어요.",
              rating: 4.6,
            },
            {
              text: "매운맛이 강렬하지만 맛있는 마라 요리였어요.",
              rating: 4.4,
            },
          ],
        },
      ],
    },
    {
      title: "# 양식",
      items: [
        {
          name: "오스테리아 우노",
          img: images("./restaurant10.png"),
          address: "서울특별시 강남구 우노로 33",
          services: ["이탈리아 정통 요리", "와인 페어링 제공"],
          reviews: [
            {
              text: "와인과 어울리는 고급 이탈리안 요리가 일품입니다.",
              rating: 4.7,
            },
            {
              text: "이탈리아 정통 요리를 맛볼 수 있는 최고의 장소!",
              rating: 4.6,
            },
          ],
        },
        {
          name: "59쌀피자",
          img: images("./restaurant11.png"),
          address: "서울특별시 마포구 피자로 59",
          services: ["쌀도우 피자", "채식 메뉴 옵션"],
          reviews: [
            {
              text: "쌀도우 피자의 바삭함과 고소함이 최고예요!",
              rating: 4.2,
            },
            {
              text: "채식 옵션도 많아서 만족스러웠습니다.",
              rating: 4.0,
            },
          ],
        },
        {
          name: "롤링파스타",
          img: images("./restaurant12.png"),
          address: "서울특별시 노원구 롤링길 77",
          services: ["크림 파스타 전문", "저렴한 가격대"],
          reviews: [
            {
              text: "저렴한 가격에 푸짐한 양! 학생들에게 인기 만점!",
              rating: 4.3,
            },
            {
              text: "크림 파스타가 진하고 고소해서 만족스러웠습니다.",
              rating: 4.1,
            },
          ],
        },
      ],
    },
    {
      title: "# 고기",
      items: [
        {
          name: "보리네 주먹고기",
          img: images("./restaurant13.png"),
          address: "서울특별시 강남구 주먹고기로 1",
          services: ["참숯을 이용한 고기 구이", "반찬 무한 리필 제공"],
          reviews: [
            {
              text: "고기가 신선하고 참숯 향이 좋아요. 가족 모임에 딱입니다.",
              rating: 4.8,
            },
            {
              text: "반찬도 맛있고 고기도 질이 좋아 만족스러웠어요.",
              rating: 4.7,
            },
          ],
        },
        {
          name: "육식",
          img: images("./restaurant14.png"),
          address: "서울특별시 송파구 육식로 12",
          services: ["고기 뷔페", "다양한 소스와 함께 제공"],
          reviews: [
            {
              text: "뷔페라 다양한 종류의 고기를 먹을 수 있어서 좋았습니다.",
              rating: 4.5,
            },
            {
              text: "소스가 다양해서 맛있게 먹었어요.",
              rating: 4.3,
            },
          ],
        },
        {
          name: "성대곱창",
          img: images("./restaurant15.png"),
          address: "서울특별시 서대문구 곱창길 20",
          services: ["곱창 전문점", "청결한 곱창 요리 제공"],
          reviews: [
            {
              text: "곱창이 신선하고 냄새가 나지 않아 먹기 편했습니다.",
              rating: 4.6,
            },
            {
              text: "깨끗하고 맛있는 곱창이 인상 깊었습니다.",
              rating: 4.4,
            },
          ],
        },
      ],
    },
    {
      title: "# 햄버거",
      items: [
        {
          name: "맥도날드",
          img: images("./restaurant16.png"),
          address: "서울특별시 중구 햄버거로 5",
          services: ["다양한 세트 메뉴", "24시간 운영"],
          reviews: [
            {
              text: "항상 기대를 저버리지 않는 맛과 빠른 서비스!",
              rating: 4.2,
            },
            {
              text: "빠르게 먹기 좋은 기본적인 맛의 햄버거.",
              rating: 4.0,
            },
          ],
        },
        {
          name: "롯데리아",
          img: images("./restaurant17.png"),
          address: "서울특별시 강북구 버거길 10",
          services: ["한정판 메뉴 출시", "프리미엄 세트 제공"],
          reviews: [
            {
              text: "다양한 한정판 메뉴가 있어 항상 새롭습니다.",
              rating: 4.0,
            },
            {
              text: "프리미엄 세트 메뉴가 특히 맛있었습니다.",
              rating: 3.9,
            },
          ],
        },
        {
          name: "사우스스트릿",
          img: images("./restaurant18.png"),
          address: "서울특별시 강남구 스트릿길 22",
          services: ["프리미엄 수제버거", "신선한 재료 사용"],
          reviews: [
            {
              text: "신선한 재료로 만든 프리미엄 수제버거가 맛있습니다.",
              rating: 4.7,
            },
            {
              text: "양이 푸짐하고 재료가 신선해서 만족스러웠어요.",
              rating: 4.5,
            },
          ],
        },
      ],
    },
    {
      title: "# 베이커리",
      items: [
        {
          name: "플렁드",
          img: images("./restaurant19.png"),
          address: "서울특별시 성북구 베이커리로 15",
          services: ["천연 발효 빵", "유기농 재료 사용"],
          reviews: [
            {
              text: "빵이 부드럽고 고소해서 아침 대용으로도 좋습니다.",
              rating: 4.6,
            },
            {
              text: "유기농 재료로 만들어 건강하게 즐길 수 있는 빵.",
              rating: 4.5,
            },
          ],
        },
        {
          name: "파리바게뜨",
          img: images("./restaurant20.png"),
          address: "서울특별시 용산구 파리로 8",
          services: ["다양한 케이크와 빵", "계절 한정 메뉴 제공"],
          reviews: [
            {
              text: "케이크가 신선하고 종류가 많아서 선택의 폭이 넓어요.",
              rating: 4.4,
            },
            {
              text: "가성비 좋은 빵과 케이크를 다양하게 즐길 수 있습니다.",
              rating: 4.3,
            },
          ],
        },
        {
          name: "스타벅스",
          img: images("./restaurant21.png"),
          address: "서울특별시 종로구 커피길 12",
          services: ["커피와 베이커리", "와이파이 무료 제공"],
          reviews: [
            {
              text: "커피와 곁들여 먹는 베이커리가 아주 잘 어울립니다.",
              rating: 4.5,
            },
            {
              text: "베이커리 메뉴가 다양하고 커피와 잘 어울려요.",
              rating: 4.4,
            },
          ],
        },
      ],
    },
  ];

  const scroll = (direction) => {
    if (categoryRef.current) {
      const { scrollLeft, clientWidth } = categoryRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      categoryRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const openPopup = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const closePopup = () => {
    setSelectedRestaurant(null);
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
            src="/image/filled_star.svg"
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
                onClick={() => scroll("right")}
              >
                <img src={arrowIcon} alt="Scroll Right" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 팝업 */}
      {selectedRestaurant && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-scrollable-content">
              <img
                src={selectedRestaurant.img}
                alt={selectedRestaurant.name}
                className="popup-image"
              />
              <h3 className="popup-title">{selectedRestaurant.name}</h3>
              <p className="popup-address">{selectedRestaurant.address}</p>
              <ul className="popup-services">
                {selectedRestaurant.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
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
                onClick={() => window.open("https://maps.google.com", "_blank")}
              >
                지도에서 보기
              </button>
              <button className="popup-button" onClick={closePopup}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
