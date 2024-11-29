import React, { useState } from "react";
import "./InputModal.css";

export default function InputModal({ isOpen, onSubmit, question, setModalOpen }) {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    // 닉네임 수정 api 불러야함.
    setInputValue("");
    setModalOpen(false);
  };

  const handleCancel = () => {
    setInputValue("");
    setModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{question}</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="새로운 닉네임을 입력해주세요."
        />
        <div className="modal-buttons">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
