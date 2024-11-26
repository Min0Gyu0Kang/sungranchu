import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./pages/profile/mypage.jsx";
import AchievementPage from "./pages/profile/achievement.jsx";
import ModifyPage from "./pages/profile/modifyProfile.jsx";
import Login from "./pages/Login/Login"; // Login 컴포넌트 가져오기
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Login/SignupForm"; // 계정 생성 페이지
import Home from "./pages/Home/Home.jsx";
import Search from "./pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/review" element={<ReviewPage />} />
        <Route path="/mypage/achievement" element={<AchievementPage />} />
        <Route path="/mypage/modify" element={<ModifyPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
