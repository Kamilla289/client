import React from 'react'
import Graphic from './Graphic'
import About from './About'
import Sector from '../Desing/Sector'

const SectionAbout = () => {
  return (
    <div>
      <Sector to='skill'>
        <Graphic />
        <About />
      </Sector>

    </div>
  )
}

export default SectionAbout