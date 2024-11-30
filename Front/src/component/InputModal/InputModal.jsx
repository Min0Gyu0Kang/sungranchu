import React, { useState, useEffect } from "react";
import "./InputModal.css";

export default function InputModal({ isOpen, onSubmit, question, setModalOpen, setNewValue }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(()=>{
    if (setNewValue) setNewValue(inputValue);
  },[inputValue])

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onSubmit) onSubmit();
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
