import React from 'react'
import Motive from './Motive'
import Test from './Test'
import Sector from '../Desing/Sector'
import { Element } from 'react-scroll'
import Model from './Model'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { slideAnimation } from '../../config/motion'

const SectionMain = () => {
  return (
    <Element id='main' className='main-mraz'>

      <AnimatePresence>

        <Sector noneUp to='about'>
          <motion.div {...slideAnimation('left')}>
            <Motive />
          </motion.div>
          <Canvas camera={{ position: [0, 0, 2] }}>
            <ambientLight intensity={3.5} />
            <directionalLight position={[100, 10, 50]} />
            <Model />
          </Canvas>
        </Sector>

      </AnimatePresence>

    </Element>
  )
}

export default SectionMain