import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF } from '@react-three/drei';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../../data/mokupData';
import useDecalTextures from '../../config/useDecalTextures';

const Bag = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/Bag_02.glb');
  const { logoTexture, fullTexture } = useDecalTextures();

  // Список материалов для плавной окраски
  const materialKeys = ['Vitrina-066'];
  useFrame((_, delta) => {
    materialKeys.forEach((key) => {
      if (materials[key]) {
        easing.dampC(materials[key].color, snap.color, 0.25, delta);
      }
    });
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Vitrina-174'].geometry}
        material={materials['Vitrina-066']}
        dispose={null}
        position={[-0.4, -0.05, 0]}
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

export default Bag;