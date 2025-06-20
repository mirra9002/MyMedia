import { useNavigate } from 'react-router-dom';
import './Header.css';
import accountImage from '../../public/account.svg'

export default function Header() {
  const navigate = useNavigate();

  return (<>
    <header className="header">
      <div className="header-left" onClick={() => navigate('/')}>
        <span className="logo">MyMedia</span>
      </div>

      <nav className="header-center">
        <ul className="nav-list">
          <li onClick={() => navigate('/news')}>Новини</li>
          <li onClick={() => navigate('/history')}>Історія</li>
          <li onClick={() => navigate('/analyzes')}>Розбори</li>
          <li onClick={() => navigate('/interviews')}>Інтерв'ю</li>
        </ul>
      </nav>

      <div className="header-right">
        <span className="my-account" onClick={() => navigate('/myprofile')}><img src={accountImage}></img></span>
        <button className="post-article" onClick={() => navigate('/newarticle')}>Написати статтю</button>
      </div>
      
    </header>
    <hr className="header-divider" />
    {/* <div style={{ height: '20px' }}></div> */}
    </>
  );
}
