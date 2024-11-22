import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyPage from './pages/profile/mypage.jsx'
import Login from './pages/Login/Login'; // Login 컴포넌트 가져오기
import LoginForm from './pages/Login/LoginForm';
import SignupForm from './pages/Login/SignupForm.jsx'; // 계정 생성 페이지


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

function Base () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button>
          push me
        </button>
      </header>
    </div>
  )
}

export default App;

