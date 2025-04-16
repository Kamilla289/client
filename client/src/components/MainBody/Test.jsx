import { MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import './SectionMain.css'

const Test = () => {
  return (
    <div className='slurry-block'>
      <Canvas>
        <OrbitControls enableZoom={false} enableRotate={false} />
        <ambientLight intensity={1} />
        <directionalLight position={[3, 2, 1]} />
        <Sphere args={[1, 20, 100]} scale={3} >
          <MeshDistortMaterial
            color='red'
            attach='material'
            distort={0.5}
            speed={2} />
        </Sphere>
      </Canvas>
    </div>
  )
}

export default Test
