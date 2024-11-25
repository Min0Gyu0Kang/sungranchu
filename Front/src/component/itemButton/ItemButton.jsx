import React from 'react';
import './ItemButton.css';

const ItemButton = ({ imageSrc, title, subtitle, onClick }) => {
  return (
    <div className="item-button" onClick={onClick}>
      <div className="item-image">
        <img src={imageSrc} alt="item" />
      </div>
      <div className="item-content">
        <div className="item-title">{title}</div>
        <div className="item-subtitle">{subtitle}</div>
      </div>
    </div>
  );
};

export default ItemButton;