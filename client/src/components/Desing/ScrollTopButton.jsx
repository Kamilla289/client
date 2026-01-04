import React, { useEffect, useState } from 'react';
import ArrowUp from '../../assets/image/ArrowUp.svg';
import ArrowUpDark from '../../assets/image/ArrowUp-dark.svg';
import './Scroll.css';
import { Link } from 'react-scroll';
import { useLocation } from 'react-router-dom';
import { useTheme } from './Themes/ThemeContext';
import { useMediaQuery } from 'react-responsive';

const ScrollTopButton = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  if (location.pathname !== '/' || !show) return null;

  return (
    <>
      {!isMobile ? (<Link to='main' smooth={true} duration={500}>
        <div className="arrow-up-container">
          <img className='arrow-up' src={theme === 'dark' ? ArrowUpDark : ArrowUp} alt="Клацай вверх" />
        </div>
      </Link>) : null}
    </>
  );
};

export default ScrollTopButton;
