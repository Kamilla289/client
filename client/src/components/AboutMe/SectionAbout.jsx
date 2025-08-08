import React from 'react'
import About from './About'
import Sector from '../Desing/Sector'
import { Element } from 'react-scroll'
import './About.css'
import ImageMotion from './ImageMotion'

const SectionAbout = () => {
  return (
    <Element name='about' id='about' className='main-mraz about-container-styled'>
      <Sector to='skill'>
        <ImageMotion />
        <About />
      </Sector>
    </Element>
  )
}

export default SectionAbout