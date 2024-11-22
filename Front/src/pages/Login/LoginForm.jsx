import React from 'react';
import './Login.css';
import characterImage from './character.png'; // 이미지 파일 import

export default function LoginForm() {
  return (
    <div className="login-container">
      <div className="header">
        <img src={characterImage} alt="캐릭터" className="character-image" />
        <p className="speech-bubble">오늘은 어떤 맛집에 가볼까?</p>
      </div>

      <div className="form-container">
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" className="input-field" placeholder="이메일 입력" />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="비밀번호 입력"
        />

        <button className="login-btn">로그인 하기</button>
      </div>
    </div>
  );
}
