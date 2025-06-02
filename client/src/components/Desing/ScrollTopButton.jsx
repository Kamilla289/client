import React, { useEffect, useState } from 'react'
import ArrowUp from '../../assets/image/ArrowUp.svg'
import './Scroll.css'
import { Link } from 'react-scroll';

const ScrollTopButton = () => {

  const [show, setshow] = useState(false);
  useEffect(() => {
    const HandleScroll = () => {
      const About = document.getElementById('about');
      if (!About) return;
      const rect = About.getBoundingClientRect();
      setshow(rect.top <= 0);
    };
    window.addEventListener('scroll', HandleScroll);
    HandleScroll();
    return () => window.removeEventListener('scroll', HandleScroll)
  }, []);

  if (!show) return null;

  return (
    <Link to='main' smooth={true} duration={500}>
      <img className='arrow-up' src={ArrowUp} alt="Клацай вверх" />
    </Link>
  )
}

export default ScrollTopButton