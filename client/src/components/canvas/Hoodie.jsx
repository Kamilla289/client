import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF } from '@react-three/drei';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../../data/mokupData';
import useDecalTextures from '../../config/useDecalTextures';

const Hoodie = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/Hudi_01.glb');

  const { logoTexture, fullTexture } = useDecalTextures();

  useFrame((_, delta) => {
    easing.dampC(materials.Sweatshirt_Purple.color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sweatshirt_Purple.geometry}
        material={materials.Sweatshirt_Purple}
        dispose={null}
        position={[-0.4, 0.05, 0]}
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
            position={[0, 0, 0.1]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthWrite={true}
            polygonOffsetFactor={-1}
            side={THREE.FrontSide}
          />
        )}
      </mesh>
    </group>
  );
};

export default Hoodie;