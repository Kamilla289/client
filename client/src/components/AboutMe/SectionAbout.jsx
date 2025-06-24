import React from 'react'
import Graphic from './Graphic'
import About from './About'
import Sector from '../Desing/Sector'
import { Element } from 'react-scroll'

const SectionAbout = () => {
  return (
    <Element name='about' id='about' className='main-mraz'>
      <Sector to='skill' >
        <Graphic />
        <About />
      </Sector>
    </Element>
  )
}

export default SectionAbout