import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import Shirt from './Shirt';
import CameraRig from './CameraRig';
import './index.css'; // Assuming you have some styles in index.css

const CanvasModel = () => {
  return (
    <Canvas
      style={{ height: '100vh' }}
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="canvas-model"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Center>
          <group position={[-0.4, 0, 0]}>
            <Shirt />
          </group>
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel