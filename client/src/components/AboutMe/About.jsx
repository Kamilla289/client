import React from 'react'
import { aboutMe } from '../../data/AboutMe';
import { Element } from 'react-scroll'
import './About.css'

const About = () => {
  const { title, text1, text2 } = aboutMe

  return (
    <Element name='about' className="block-about-text">
      <div >
        <div className='block-about'>
          <div className="about-me-description">
            <h2 className='title-about'>{title}</h2>
            <p>{text1}</p>
            <p className='description-goal'>{text2}</p>
          </div>
        </div>
      </div>
    </Element>
  )
}

export default About
