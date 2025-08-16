import React, { useState } from 'react';
import { aboutMe } from '../../data/AboutMe';
import { Element } from 'react-scroll';
import './About.css';

const About = () => {
  const { description } = aboutMe;

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Element name="about" id="about" className="about-me-block">
      <div className="block-about">
        <div className="block-about-title">
          <h2 className="title-about">{description.title}</h2>
        </div>
        <div className="about-me-description">
          <p>{description.text1}</p>
          {isVisible && (
            <p className="description-goal">{description.text2}</p>
          )}
        </div>
        <button
          className="button-gradient"
          onClick={toggleVisibility}
        >
          {isVisible ? 'Скрыть' : 'Читать далее...'}
        </button>
      </div>
    </Element>
  );
};

export default About;
