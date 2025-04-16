import React from 'react'
import Photo from '../../assets/image/Photo.png'
import Test from '../MainBody/Test'
import './About.css'
const Graphic = () => {
  return (
    <div className='slurry-block'>
      <img src={Photo} alt='фото' className='img-photo' />
      <Test />
    </div>
  )
}

export default Graphic
