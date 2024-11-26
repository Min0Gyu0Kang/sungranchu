import React, { useState, useEffect } from "react";
import "./profile.css";
import ItemButton from "../../component/itemButton/ItemButton";
import UpperNav from "../../component/upperNav/UpperNav";

import baseImage from './img/basic_profile.png';
import profileIcon from './img/profile_icon.png'

export default function ModifyPage () {
  const goBack = true;
  const [profileImage, setProfileImage] = useState(baseImage);
  const [nickname, setNickname] = useState("마라엽떡"); // 닉네임은 api를 이용해서 불러와야 함.

  return (
    <div className="container-achievement">
      <UpperNav title="개인정보 수정" goBack={goBack} />

      {/* Upper Area */}
      <div className="modify-upper-area">
        <img className="profile-image-modify-page" src={profileImage} alt="Profile" />
        <div><span style={{fontSize: "26px", fontWeight: "bold"}}>{nickname}</span> <span style={{fontSize: "18px", fontWeight: "bold"}}>님, 어서오세요!</span></div>
      </div>

      <div className="modify-list-container">
        <ItemButton imageSrc={profileIcon} title="닉네임 수정하기" subtitle="나를 나타내는 예쁜 닉네임을 지어봐요."/>
      </div>
    </div>
  );
}
