import React from 'react'
import { aboutMe } from '../../data/AboutMe';
import { Element } from 'react-scroll'
import './About.css'

const About = () => {
  const { description } = aboutMe

  return (
    <Element name='about' id='about' className="block-about-text" >
      <div >
        <div className='block-about'>
          <h2 className='title-about'>{description.title}</h2>
          <div className="about-me-description">
            <p>{description.text1}</p>
            <p className='description-goal'>{description.text2}</p>
          </div>
          <button className='button-gradient'>Читать далее...</button>
        </div>
      </div>
    </Element>
  )
}

export default About
