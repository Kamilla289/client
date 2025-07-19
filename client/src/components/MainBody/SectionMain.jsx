import React, { useState } from 'react'
import Motive from './Motive'
import Test from './Test'
import Sector from '../Desing/Sector'
import { Element } from 'react-scroll'
import Model from './Model'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { slideAnimation } from '../../config/motion'

const SectionMain = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <Element id='main' className='main-mraz'>

      <AnimatePresence>

        <Sector noneUp to='about'>
          <motion.div {...slideAnimation('left')}>
            <Motive />
          </motion.div>
          <div
            style={{ width: "100%", height: "100%", position: "relative" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Canvas camera={{ position: [0.35, 0.1, 2.1] }}>
              <ambientLight intensity={4} />
              <directionalLight position={[100, 10, 50]} />
              <Model hovered={hovered} />
            </Canvas>
          </div>
        </Sector>

      </AnimatePresence>

    </Element>
  )
}

export default SectionMain