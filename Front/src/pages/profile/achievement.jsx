import React, { useState, useEffect } from "react";
import "./profile.css";
import ItemButton from "../../component/itemButton/ItemButton";
import UpperNav from "../../component/upperNav/UpperNav";
import { useNavigate } from "react-router-dom";
import restaurantIcon from "./img/restaurant_icon.png";

export default function AchievementPage () {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('마라엽떡');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log('nick: ', userData.nickname);
    setNickname(userData.nickname);
  }, [userData])

  useEffect(() => {
    const get_user = async (e) => {
      try {
        const response = await fetch('http://localhost:8080/mypage/info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });

        if (response.ok) {
          const data = await response.json(); // JSON 데이터 읽기
          setUserData(data);
        } else if (response.status === 401) {
          alert('로그인 실패: 잘못된 자격 증명');
        } else {
          console.error(`로그인 실패: ${response.status}`);
        }
      } catch (error) {
        console.error('네트워크 에러 발생:', error);
      }
    }
    get_user();
  }, [])
  const goBack = true;
  const exampleData = [
    {
      title: "한식 입문자",
      specific: '"한식"카테고리의 식당을 3번 이상 방문했어요.',
      exp: "10"
    },
    {
      title: "중식 입문자",
      specific: '"중식"카테고리의 식당을 3번 이상 방문했어요.',
      exp: "10"
    },
    {
      title: "일식 입문자",
      specific: '"일식"카테고리의 식당을 3번 이상 방문했어요.',
      exp: "10"
    }
  ];

  const [achievements, setAchievements] = useState([]);
  const [exp, setExp] = useState(30);
  const [lv, setLv] = useState(1);

  useEffect(() => {
    setAchievements(exampleData);
  }, []);

  return (
    <div className="container-achievement">
      <UpperNav title="업적" goBack={goBack} />

      {/* Upper Area */}
      <div className="achievement-upper-area">
        <div className="achievement-upper-text">
          <span style={{fontSize: "24px"}}>{nickname}님</span>
          <span style={{flexGrow: "1"}}>의 레벨은...</span>
          <span style={{fontSize: "52px"}}>{lv}</span>
        </div>
        <div className="achievement-lower-text">
          <span style={{flexGrow: "1"}}>다음 레벨까지...</span>
          <span style={{fontSize: "28px"}}>{exp}xp</span>
        </div>
      </div>

      {/* Achievement List */}
      <div className="achievement-list-container">
        <div className="achievement-list-title">업적 목록</div>
        <div className="item-list">
          {achievements.map((achievement, index) => (
            <ItemButton
              key={index}
              imageSrc={restaurantIcon}
              title={achievement["title"]}
              subtitle={achievement["specific"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
