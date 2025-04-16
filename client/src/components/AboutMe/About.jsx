import React from 'react'
import { aboutMe } from '../../data/AboutMe';
import './About.css'

const About = () => {
  return (
    <div className="block-about-text">
      <div >
        {aboutMe.map((item) => {
          return (
            <div key={item.id} className='block-about'>
              <div className="about-me-description">
                <h2>{item.title}</h2>
                {item.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default About
