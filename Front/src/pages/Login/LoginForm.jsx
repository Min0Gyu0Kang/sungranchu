import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router's useNavigate
import './LoginForm.css'; // LoginForm 전용 CSS 파일
import characterImage from './character.png'; // 이미지 파일 import

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        credentials: 'include', // 쿠키 포함
      });

      if (response.ok) {
        console.log('로그인 성공');
        navigate('/home'); // 성공 시 페이지 이동
      } else if (response.status === 401) {
        alert('로그인 실패: 잘못된 자격 증명');
      } else {
        console.error(`로그인 실패: ${response.status}`);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('네트워크 에러 발생:', error);
      alert('서버와 통신하는 중 문제가 발생했습니다.');
    }
  };

  return (
      <div className="login-form-container">
        <div className="login-header">
          <img src={characterImage} alt="캐릭터" className="character-image" />
          <p className="speech-bubble">오늘은 어떤 맛집에 가볼까?</p>
        </div>

        <form onSubmit={handleLogin} className="form-content">
          <label htmlFor="username">닉네임</label>
          <input
              type="text"
              id="username"
              className="input-field"
              placeholder="닉네임 입력"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">비밀번호</label>
          <input
              type="password"
              id="password"
              className="input-field"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            로그인 하기
          </button>
        </form>
      </div>
  );
}
