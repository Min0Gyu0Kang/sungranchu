import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router's useNavigate
import './LoginForm.css'; // LoginForm 전용 CSS 파일
import characterImage from './character.png'; // 이미지 파일 import

export default function LoginForm() {
  const navigate = useNavigate(); // useNavigate 훅 선언

  // 로그인 버튼 클릭 시 호출될 함수
  const handleLogin = () => {
    navigate('/home'); // /home 경로로 이동
  };

  return (
    <div className="login-form-container">
      <div className="login-header">
        <img src={characterImage} alt="캐릭터" className="character-image" />
        <p className="speech-bubble">오늘은 어떤 맛집에 가볼까?</p>
      </div>

      <div className="form-content">
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" className="input-field" placeholder="이메일 입력" />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="비밀번호 입력"
        />

        <button className="login-btn" onClick={handleLogin}>
          로그인 하기
        </button>
      </div>
    </div>
  );
}
