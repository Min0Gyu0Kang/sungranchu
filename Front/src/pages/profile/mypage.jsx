import React from 'react';
import './profile.css';

export default function MyPage () {
  return (
    <div className="container">
      <div className="box">
        <UpperNav />

      </div>
    </div>
  )
}

function UpperNav() {
  return (
    <div className="upper-nav">
      <b className="nav-title">마이 페이지</b>
    </div>
  );
}