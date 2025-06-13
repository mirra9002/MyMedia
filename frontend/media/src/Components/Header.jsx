import { useNavigate } from 'react-router-dom';
import './Header.css'
export default function Header() {
  const navigate = useNavigate();
  function handleClick(location) {
    navigate(location)
  }
  

  return (
    <>
      <div id="div-header">
        <p onClick={() => handleClick('/')}>MyMedia</p>
        <ul id="ul-header">
            <li>News</li>
            <li>History</li>
            <li>Analyzes</li> 
            <li>Interviews</li>
        </ul>
        <p>My account</p>
        <button onClick={() => handleClick('/newarticle')}>POST article</button>
      </div>
    </>
  );
}