import React from 'react'
import Motive from './Motive'
import Test from './Test'
import Sector from '../Desing/Sector'
import { Element } from 'react-scroll'

const SectionMain = () => {
  return (
    <Element id='main'>
      <Sector noneUp to='about'>
        <div className="mraz1" style={{ display: 'flex' }}>

          <Motive />

          <Test />
        </div>
      </Sector>
    </Element>
  )
}

export default SectionMain
