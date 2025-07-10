import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../../data/mokupData'
import './Mockup.css'

const ColorPicker = () => {
  const snap = useSnapshot(state)
  return (
    <div className='colorpicker-container'>
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => state.color = color.hex} />
    </div>
  )
}

export default ColorPicker