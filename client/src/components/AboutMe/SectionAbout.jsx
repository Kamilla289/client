import React from 'react'
import About from './About'
import Sector from '../Desing/Sector'
import { Element } from 'react-scroll'
import './About.css'
import ImageMotion from './ImageMotion'
import { useMediaQuery } from 'react-responsive'

const SectionAbout = () => {
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  return (
    <Element name='about' id='about' className='main-mraz about-container-styled'>

      {isMobile ? (
        <Sector to='skill'>
          <About onlyTitle />
          <ImageMotion />
          <About onlyList />
        </Sector>
      ) : (
        <Sector to='skill'>
          <ImageMotion />
          <About />
        </Sector>
      )}

    </Element>
  )
}

export default SectionAbout