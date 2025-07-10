import React, { useEffect, useRef, useState } from 'react';
import Sector from '../Desing/Sector';
import ArrowN from '../../assets/image/slider/next-arrow.png';
import ArrowNDark from '../../assets/image/slider/next-arrow-dark.png';
import { useTheme } from '../Desing/Themes/ThemeContext';
import ArrowP from '../../assets/image/slider/prev-arrow.png';
import ArrowPDark from '../../assets/image/slider/prev-arrow-dark.png';
import Html from '../../assets/image/slider/html.png'
import JS from '../../assets/image/slider/js.png'
import Git from '../../assets/image/slider/git.png'
import Ant from '../../assets/image/slider/ant.png'
import ReactImg from '../../assets/image/slider/react.png'
import Sass from '../../assets/image/slider/sass.png'
import Three from '../../assets/image/slider/three.png'
import Mui from '../../assets/image/slider/mui.png'
import SquareBack from '../../assets/image/slider/square-back.png'
import RectBack1 from '../../assets/image/slider/rect-back-1.png'
import RectBack2 from '../../assets/image/slider/rect-back-2.png'
import './Carousel.css';
import { Element } from 'react-scroll';

const skills = [
  {
    title: "Git",
    whiteImage: SquareBack,
    image: Git,
    text: "Создание и клонирование репозиториев, добавление коммит изменений, управление ветками. Знакома с .gitignore и работой с GitHub.",
    lvl: 60
  },
  {
    title: "JavaScript",
    whiteImage: SquareBack,
    image: JS,
    text: "Работа с переменными, функциями и массивами, асинхронными операциями. Работа с DOM для манипуляции элементами и взаимодействия с API.",
    lvl: 70
  },
  {
    title: "HTML/CSS",
    whiteImage: RectBack1,
    image: Html,
    text: "Flexbox и Grid, адаптивная верстка, формы и валидация, а также интеграция анимаций и переходов.",
    lvl: 100
  },
  {
    title: "Ant Design",
    whiteImage: SquareBack,
    image: Ant,
    text: "Использование библиотеки компонентов для создания современных и удобных интерфейсов в корпоративных приложениях. Опыт работы с готовыми компонентами, такими как формы, таблицы и кнопки, а также настройка тем и адаптивного дизайна.",
    lvl: 40
  },
  {
    title: "MUI",
    whiteImage: RectBack2,
    image: Mui,
    text: "Работа с темами, стилизацией и адаптивным дизайном для улучшения пользовательского опыта.",
    lvl: 50
  },
  {
    title: "React",
    whiteImage: SquareBack,
    image: ReactImg,
    text: "Разработка динамичных веб-приложений с использованием компонентов, управления состоянием и жизненного цикла, что позволяет создавать интерактивные интерфейсы",
    lvl: 80
  },
  {
    title: "Sass",
    whiteImage: SquareBack,
    image: Sass,
    text: "Применение препроцессора CSS для написания структурированного и поддерживаемого стиля, включая использование переменных, вложенности и миксинов для упрощения работы с CSS.",
    lvl: 90
  },
  {
    title: "ThreeJS",
    whiteImage: SquareBack,
    image: Three,
    text: "Создание 3D-графики и анимаций в веб-приложениях, позволяющее интегрировать интерактивные визуализации и улучшать пользовательский опыт.",
    lvl: 50
  }
];

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
      <Sector>
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
