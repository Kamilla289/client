import React from 'react'
import Photo from '../../assets/image/Photo.png'
import './About.css'
import SlurryAbout from './SlurryAbout'


const Graphic = () => {
  return (
    <div className='slurry-block'>
      <img src={Photo} alt='фото' className='img-photo' />
      <SlurryAbout />
    </div>
  )
}

export default Graphic
