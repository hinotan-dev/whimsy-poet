import React from 'react';
import menuOpen from '../assets/menu-open.png';
import menuClose from '../assets/menu-close.png';
import iconBooks from '../assets/icon-books-2.png';
import iconHand from '../assets/icon-hand.png';
import iconSmile from '../assets/icon-smile.png';
import './Menu.css';

export default function MenuScreen({ setPage }) {  

  const [menuVisible, setMenuVisible] = React.useState(false);

  function handleMenuClick(page) {
    setPage(page);
    setMenuVisible(false);
  }

  return (
    <header className="menu-header">
      {!menuVisible ? (
        <div className="menu-icon" onClick={() => setMenuVisible(true)}>
          <img src={menuOpen} alt="menu icon" />
        </div>
      ) : (
        <div className="menu-icon" onClick={() => setMenuVisible(false)}>
          <img src={menuClose} alt="close menu icon" />
        </div>
      )}
      {menuVisible && (
        <div className="display-menu">
          <div className="icons-wrapper">
            <div className="icon smile" onClick={() => handleMenuClick("about")}>
              <img src={iconSmile} alt="smile icon" />
              <span>About</span>
            </div>
            <div className="icon hand" onClick={() => handleMenuClick("keywords")}>
              <img src={iconHand} alt="hand icon" />
              <span>Make a poem</span>
            </div>
            <div className="icon books" onClick={() => handleMenuClick("library")}>
              <img src={iconBooks} alt="books icon" />
              <span>My library</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}