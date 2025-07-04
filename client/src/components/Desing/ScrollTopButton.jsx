import React, { useEffect, useState } from 'react';
import ArrowUp from '../../assets/image/ArrowUp.svg';
import './Scroll.css';
import { Link } from 'react-scroll';
import { useLocation } from 'react-router-dom';

const ScrollTopButton = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

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
    <Link to='main' smooth={true} duration={500}>
      <img className='arrow-up' src={ArrowUp} alt="Клацай вверх" />
    </Link>
  );
};

export default ScrollTopButton;
