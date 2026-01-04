import React, { useEffect, useRef, useState } from 'react';
import Sector from '../Desing/Sector';
import ArrowN from '../../assets/image/slider/next-arrow.png';
import ArrowNDark from '../../assets/image/slider/next-arrow-dark.png';
import { useTheme } from '../Desing/Themes/ThemeContext';
import ArrowP from '../../assets/image/slider/prev-arrow.png';
import ArrowPDark from '../../assets/image/slider/prev-arrow-dark.png';
import { skills } from '../../data/skills';
import './Carousel.css';
import { Element } from 'react-scroll';

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [animateLevel, setAnimateLevel] = useState(0);
  const animateRef = useRef(null);

  const { title, text, lvl, image, whiteImage } = skills[index];

  const animateProgress = (targetLevel) => {
    let start = null;
    cancelAnimationFrame(animateRef.current);
    const duration = 2000;

    const step = (timeStamp) => {
      if (!start) start = timeStamp;
      const progress = timeStamp - start;
      const percent = Math.min((progress / duration) * targetLevel, targetLevel);

      setAnimateLevel(Math.floor(percent));

      if (percent < targetLevel) {
        animateRef.current = requestAnimationFrame(step);
      }
    };

    setAnimateLevel(0);

    // Уменьшенная задержка для более отзывчивой анимации
    setTimeout(() => {
      animateRef.current = requestAnimationFrame(step);
    }, 500);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % skills.length);
      setFade(true);
    }, 500);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + skills.length) % skills.length);
      setFade(true);
    }, 500);
  };

  useEffect(() => {
    animateProgress(lvl);
    return () => cancelAnimationFrame(animateRef.current);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 500000);

    return () => clearInterval(interval);
  }, []);

  const { theme } = useTheme();

  return (
    <Element name='skill' className='main-mraz'>
      <Sector to='steps'>
        <div className="slider">
          <h2 className='tech-title'>MY STACK TECHNOLOGY</h2>
          <div className="slider-main">
            <button onClick={handlePrev} className="slider-prev">
              <img src={theme === 'dark' ? ArrowPDark : ArrowP} alt="Previous" className="prev" />
            </button>
            <div key={index} className={`slider-block ${fade ? 'fadeIn' : 'fadeOut'}`}>
              <div className="mraz">

                <img src={whiteImage} alt="" className="white-back" />

                <img src={image} alt="" className="carousel-image" />
              </div>

              <div className="right-description">
                <h3 className="slider-title">{title}</h3>
                <p className="slider-text">{text}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${animateLevel}%` }}>
                    {animateLevel}%
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleNext} className="slider-next">
              <img src={theme === 'dark' ? ArrowNDark : ArrowN} alt="Next" className="next" />
            </button>
          </div>
        </div>
      </Sector>
    </Element>
  );
};

export default Carousel;
