import React from 'react'
import Graphic from './Graphic'
import About from './About'
import Sector from '../Desing/Sector'
import { Element } from 'react-scroll'

const SectionAbout = () => {
  return (
    <Element name='about' id='about' >
      <Sector to='skill' >
        <div className="mraz2" style={{ display: 'flex' }}>
          <Graphic />
          <About />
        </div>
      </Sector>

    </Element>
  )
}

export default SectionAbout