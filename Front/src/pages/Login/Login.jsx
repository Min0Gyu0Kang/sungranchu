import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import boardImage from './logo.png'; // 이미지 파일 import

export default function Login() {
  const navigate = useNavigate();

  // "로그인 하기" 버튼 클릭 핸들러
  const handleLoginClick = () => {
    navigate('/login'); // 두 번째 페이지로 이동
  };

  // "계정 생성하기" 버튼 클릭 핸들러
  const handleSignupClick = () => {
    navigate('/signup'); // 계정 생성 페이지로 이동
  };

  return (
    <div className="login-container">
      <div className="header">
        <img src={boardImage} alt="성랜추 보드" className="board-image" />
      </div>

      <div className="actions">
        <button className="create-account-btn" onClick={handleSignupClick}>
          계정 생성하기
        </button>
        <p className="login-text">
          이미 계정이 있으신가요?{' '}
          <span className="login-link" onClick={handleLoginClick}>
            로그인 하기
          </span>
        </p>
      </div>
    </div>
  );
}
