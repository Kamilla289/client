import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF } from '@react-three/drei';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../../data/mokupData';
import useDecalTextures from '../../config/useDecalTextures';

const Package = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/Bag_01.glb');
  const { logoTexture, fullTexture } = useDecalTextures();

  useFrame((_, delta) => {
    easing.dampC(materials.Bag.color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bag_1v.geometry}
        material={materials.Bag}
        dispose={null}
        position={[-0.4, 0, 0]}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
            depthTest={true}
            depthWrite={true}
            polygonOffset
            polygonOffsetFactor={-1}
            transparent={true}
            side={THREE.FrontSide}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, -0.1, 0.1]}
            rotation={[0, 0, 0]}
            scale={0.2}
            map={logoTexture}
            depthTest={false}
            polygonOffset
            polygonOffsetFactor={-10}
            transparent
          />
        )}
      </mesh>
    </group>
  );
};

export default Package;