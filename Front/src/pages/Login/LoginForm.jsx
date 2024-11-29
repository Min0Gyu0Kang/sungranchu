import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router's useNavigate
import './LoginForm.css'; // LoginForm 전용 CSS 파일
import characterImage from './character.png'; // 이미지 파일 import

export default function LoginForm() {
  const [email, setEmail] = useState(''); // email state 선언
  const [password, setPassword] = useState(''); // password state 선언
  const navigate = useNavigate(); // useNavigate 훅 선언

  // 로그인 버튼 클릭 시 호출될 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ email, password }), // JSON 형태로 body 전달
      });

      if (response.ok) {
        const data = await response.json();
        console.log('로그인 성공:', data); // 응답 데이터 출력
        navigate('/home'); // /home 경로로 이동
      } else {
        console.error('로그인 실패:', response.status);
        alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  function 핸들로그인() {
    navigate('/home'); // /home 경로로 이동
  }

  return (
    <div className="login-form-container">
      <div className="login-header">
        <img src={characterImage} alt="캐릭터" className="character-image" />
        <p className="speech-bubble">오늘은 어떤 맛집에 가볼까?</p>
      </div>

      <form onSubmit={핸들로그인} className="form-content">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          className="input-field"
          placeholder="이메일 입력"
          value={email} // state와 연동
          onChange={(e) => setEmail(e.target.value)} // 입력값 변경 시 state 업데이트
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="비밀번호 입력"
          value={password} // state와 연동
          onChange={(e) => setPassword(e.target.value)} // 입력값 변경 시 state 업데이트
        />

        <button type="submit" className="login-btn">
          로그인 하기
        </button>
      </form>
    </div>
  );
}
