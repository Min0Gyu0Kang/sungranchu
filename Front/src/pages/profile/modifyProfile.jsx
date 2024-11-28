import React, { useState, useEffect } from "react";
import "./profile.css";
import ItemButton from "../../component/itemButton/ItemButton";
import UpperNav from "../../component/upperNav/UpperNav";
import InputModal from "../../component/InputModal/InputModal";

import baseImage from './img/basic_profile.png';
import profileIcon from './img/profile_icon.png'
import cameraIcon from './img/camera_icon.png'

export default function ModifyPage () {
  const goBack = true;
  const [profileImage, setProfileImage] = useState(baseImage);
  const [nickname, setNickname] = useState("마라엽떡"); // 닉네임은 api를 이용해서 불러와야 함.
  const [modalOpen, setModalOpen] = useState(false);

  function handleModifyClick () {
    setModalOpen(true);
  }
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // 이미지 미리보기 설정
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="container-achievement">
      <UpperNav title="개인정보 수정" goBack={goBack} />
      <InputModal isOpen={modalOpen} setModalOpen={setModalOpen} question="닉네임을 입력하세요." />

      {/* Upper Area */}
      <div className="modify-upper-area">
        <div className="profile-image-wrapper">
          <img
            className="profile-image-modify-page"
            src={profileImage}
            alt="Profile"
          />
          <label htmlFor="image-upload" >
            <img src={cameraIcon} alt="Upload" className="circle-badge"/>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <div><span style={{fontSize: "26px", fontWeight: "bold"}}>{nickname}</span> <span style={{fontSize: "18px", fontWeight: "bold"}}>님, 어서오세요!</span></div>
      </div>

      <div className="modify-list-container">
        <ItemButton imageSrc={profileIcon} title="닉네임 수정하기" subtitle="나를 나타내는 예쁜 닉네임을 지어봐요." onClick={handleModifyClick}/>
      </div>
    </div>
  );
}
