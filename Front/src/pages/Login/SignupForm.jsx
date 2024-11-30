import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function SignupForm() {
  const navigate = useNavigate();
  const [verificationSent, setVerificationSent] = useState(false);

  const [formData, setFormData] = useState({
    memberName: "",
    nickname: "",
    memberEmail: "",
    authCode: "",
    password: "",
  });

  // 폼 데이터 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlEncodedData = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      if (key == "memberEmail") {
        urlEncodedData.append(key, formData[key] + "@g.skku.edu");
      } else {
        urlEncodedData.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // 폼 데이터로 전송
        },
        body: urlEncodedData.toString(),
      });

      if (response.ok) {
        alert("계정 생성 성공! 로그인페이지로 이동합니다.");
        navigate("/login");
      } else {
        const errorMessage = await response.text();
        alert(`오류 발생: ${errorMessage}`);
      }
    } catch (error) {
      console.error("요청 중 오류:", error);
      alert("요청 중 문제가 발생했습니다.");
    }
  };

  function sendAuthCode() {
    const email = formData["memberEmail"] + "@g.skku.edu";
    console.log('이메일: ', email)
    fetch("http://localhost:8080/request-sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memberEmail: email }),
    })
      .then((response) => {
        if (response.ok) {
          alert("인증번호가 전송되었습니다.");
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => alert(error.message));
  }

  // 인증 버튼 클릭 처리 함수
  const handleVerificationClick = (event) => {
    event.preventDefault();
    if (formData["memberEmail"]) {
      // 인증번호 발송 처리 로직
      sendAuthCode();
      setVerificationSent(true); // 인증번호 발송 후 상태 업데이트
    } else {
      alert("이메일을 입력해 주세요.");
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <form noValidate onSubmit={handleSubmit}>
          <label htmlFor="name">이름</label>
          <input
            name="memberName"
            type="text"
            id="name"
            className="input-field"
            placeholder="이름 입력"
            onChange={handleChange}
          />

          <label htmlFor="nickname">닉네임</label>
          <input
            name="nickname"
            type="text"
            id="nickname"
            className="input-field"
            placeholder="닉네임 입력"
            onChange={handleChange}
          />

          <label htmlFor="email">이메일</label>
          <div className="email-container">
            <div className="email-input-wrapper">
              <input
                name="memberEmail"
                type="text"
                id="email"
                className="input-field email-input"
                placeholder="이메일 입력"
                value={formData["memberEmail"]}
                onChange={handleChange}
              />
              <span className="email-suffix">@g.skku.edu</span>
            </div>
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
            name="authCode"
            type="text"
            id="verification"
            className="input-field"
            placeholder="인증번호 입력"
            onChange={handleChange}
          />

          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            type="password"
            id="password"
            className="input-field"
            placeholder="비밀번호 입력"
            onChange={handleChange}
          />
          <button className="create-account-btn" type="submit">
            계정 생성하기
          </button>
        </form>
      </div>
    </div>
  );
}
