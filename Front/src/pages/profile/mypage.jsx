import React from "react";
import "./profile.css";
import Footer from "../../component/footer/Footer";
import ItemButton from "../../component/itemButton/ItemButton";
import UpperNav from "../../component/upperNav/UpperNav";
import { useNavigate } from "react-router-dom";

import restaurantIcon from "./img/restaurant_icon.png";
import reviewIcon from "./img/review_icon.png";
import reservationIcon from "./img/reservation_icon.png";
import achievementIcon from "./img/achievement_icon.png";
import baseImage from "./img/basic_profile.png";

export default function MyPage() {
  const navigate = useNavigate();
  const profileImage = baseImage; // 로그인하고 이미지를 변경하면 이 이미지가 동적으로 변경되도록 바꿔야 함.
  const goBack = false;

  function handleAchievementClick() {
    navigate("/mypage/achievement");
  }

  function handleRestaurantClick() {
    navigate("/mypage/review");
  }

  function handleLogoutClick() {
    navigate("/");
  }

  return (
    <div className="container">
      <UpperNav title="마이 페이지" goBack={goBack} />
      <ProfileCard
        profileImage={profileImage}
        nickname="마라엽떡"
        leftText="Lv: 1"
        rightText="초보 먹방러"
      />

      <ItemButton
        imageSrc={restaurantIcon}
        title="방문 식당 기록 확인"
        subtitle="방문했던 식당을 확인할 수 있어요."
        onClick={handleRestaurantClick}
      />
      <ItemButton
        imageSrc={reviewIcon}
        title="리뷰 쓰기"
        subtitle="친구들을 위해 소중한 리뷰를 남겨요."
      />
      <ItemButton
        imageSrc={reservationIcon}
        title="예약하기"
        subtitle="캐치테이블과 연동하여 식당을 예약해요."
        onClick={() => {
          alert("캐치테이블로 이동합니다.\n(사실 아직 개발중)");
        }}
      />
      <ItemButton
        imageSrc={achievementIcon}
        title="업적 확인"
        subtitle="미션을 수행해서 나만의 업적을 쌓아가요."
        onClick={handleAchievementClick}
      />
      <button className="log-out" onClick={handleLogoutClick}>로그 아웃</button>
      <Footer />
    </div>
  );
}

function ProfileCard({ profileImage, nickname, leftText, rightText }) {
  const navigate = useNavigate();

  function handleModifyClick() {
    navigate("/mypage/modify");
  }

  return (
    <div className="profile-card">
      <div className="profile-left">
        <img className="profile-image" src={profileImage} alt="Profile" />
        <button className="profile-button" onClick={handleModifyClick}>
          프로필 변경
        </button>
      </div>
      <div className="profile-right">
        <div className="profile-main-text">
          {nickname} 님<span style={{ fontSize: "12px" }}>의 마이페이지</span>
        </div>
        <div className="profile-sub-text">
          <span className="left-text">{leftText}</span>
          <span className="right-text">{rightText}</span>
        </div>
      </div>
    </div>
  );
}
