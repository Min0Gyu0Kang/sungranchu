import { useNavigate } from 'react-router-dom';
import './upperNav.css'
import GoBackImg from './go_back_icon.png'

export default function UpperNav({ title }) {
  const navigate = useNavigate();

  function handleGoBack () {
    navigate(-1);
  }

  return (
    <div className="upper-nav">
      <img src={GoBackImg} onClick={handleGoBack}></img>
      <b className="nav-title">{title}</b>
    </div>
  );
}