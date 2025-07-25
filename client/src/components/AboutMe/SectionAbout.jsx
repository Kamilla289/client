import React from 'react'
import About from './About'
import MotionImage from './MotionImage'
import Sector from '../Desing/Sector'
import { Element } from 'react-scroll'
import './About.css'

const SectionAbout = () => {
  return (
    <Element name='about' id='about' className='main-mraz about-container-styled'>
      <Sector to='skill'>

        <MotionImage />
        <About />
      </Sector>
    </Element>
  )
}

export default SectionAbout