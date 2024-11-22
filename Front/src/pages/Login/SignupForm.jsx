import React from 'react';
import './Login.css';

export default function SignupForm() {
  return (
    <div className="login-container">
      <div className="form-container">
        <label htmlFor="name">이름</label>
        <input type="text" id="name" className="input-field" placeholder="이름 입력" />

        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" className="input-field" placeholder="닉네임 입력" />

        <label htmlFor="email">이메일</label>
        <input type="email" id="email" className="input-field" placeholder="이메일 입력" />

        <label htmlFor="verification">인증번호</label>
        <input
          type="text"
          id="verification"
          className="input-field"
          placeholder="인증번호 입력"
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="비밀번호 입력"
        />

        <button className="create-account-btn">계정 생성하기</button>
      </div>
    </div>
  );
}
