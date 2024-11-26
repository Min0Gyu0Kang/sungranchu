import React, { useState } from 'react';
import './Login.css';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  // 이메일 입력값을 처리하는 함수
  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (!value.includes('@g.skku.edu')) {
      setEmail(value);
    }
  };

  // 인증 버튼 클릭 처리 함수
  const handleVerificationClick = () => {
    if (email) {
      // 인증번호 발송 처리 로직 (여기서는 간단히 메시지만 출력)
      alert('인증번호가 발송되었습니다.');
      setVerificationSent(true);  // 인증번호 발송 후 상태 업데이트
    } else {
      alert('이메일을 입력해 주세요.');
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <label htmlFor="name">이름</label>
        <input type="text" id="name" className="input-field" placeholder="이름 입력" />

        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" className="input-field" placeholder="닉네임 입력" />

        <label htmlFor="email">이메일</label>
        <div className="email-container">
          <input
            type="email"
            id="email"
            className="input-field email-input"
            placeholder="이메일 입력"
            value={email}
            onChange={handleEmailChange}
          />
          <span className="email-suffix">@g.skku.edu</span>
          <button
            className="verification-btn"
            onClick={handleVerificationClick}
            disabled={verificationSent} // 인증번호가 발송되었으면 버튼 비활성화
          >
            인증하기
          </button>
        </div>

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
