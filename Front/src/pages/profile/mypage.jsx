import React from 'react';
import './profile.css';
import Footer from '../../component/Footer'

export default function MyPage () {
  return (
    <div className="container">
      <UpperNav />
      <Footer />
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