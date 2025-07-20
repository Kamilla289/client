import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import TShirt from './TShirt';
import Hoodie from './Hoodie';
import Bag from './Bag';
import Shirt from './Shirt';
import Package from './Package';
import CameraRig from './CameraRig';
import './index.css';

const CanvasModel = ({ modelName }) => {
  const renderModel = () => {
    switch (modelName) {
      case 'tshirt':
        return <TShirt />;
      case 'hoodie':
        return <Hoodie />;
      case 'bag':
        return <Bag />;
      case 'shirt':
        return <Shirt />;
      case 'package':
        return <Package />;
      default:
        return <TShirt />;
    }
  }
  return (
    <Canvas
      style={{ height: '90vh' }}
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="canvas-model"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        {renderModel()}
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel