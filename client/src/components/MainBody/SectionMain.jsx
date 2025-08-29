import React, { useState } from 'react'
import { Bounds } from "@react-three/drei";
import Motive from './Motive'
import Sector from '../Desing/Sector'
import { Element } from 'react-scroll'
import Model from './Model'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

const SectionMain = () => {
  const [hovered, setHovered] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1200 });

  return (
    <Element id='main' className='main-mraz'>
      <AnimatePresence>
        {isMobile ? (
          <Sector noHeight noneUp to='about'>
            {/* 1. Заголовок */}
            <div className="title-block">
              <h1>Причина, по которой вы здесь</h1>
            </div>

            {/* 2. 3D модель */}
            <div
              className="canvas-container"
              style={{ width: "100%", height: "100%", position: "relative" }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Canvas camera={{ position: [0.35, 0.1, 2.1] }}>
                <ambientLight intensity={4} />
                <directionalLight position={[100, 10, 50]} />
                <Bounds fit clip observe margin={1.1}>
                  <Model hovered={hovered} />
                </Bounds>
              </Canvas>
            </div>

            {/* 3. Список */}
            <Motive onlyList />
          </Sector>
        ) : (
          <Sector noneUp to='about'>
            <Motive />
            <div
              className="canvas-container"
              style={{ width: "100%", height: "100%", position: "relative" }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Canvas camera={{ position: [0.35, 0.1, 2.1] }}>
                <ambientLight intensity={4} />
                <directionalLight position={[100, 10, 50]} />
                <Bounds fit clip observe margin={1.1}>
                  <Model hovered={hovered} />
                </Bounds>
              </Canvas>
            </div>
          </Sector>
        )}

      </AnimatePresence>
    </Element>
  )
}

export default SectionMain