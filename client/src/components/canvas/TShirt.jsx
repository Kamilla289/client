import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Decal } from '@react-three/drei';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import * as THREE from 'three';

import state from '../../data/mokupData';
import useDecalTextures from '../../config/useDecalTextures';

const TShirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const { logoTexture, fullTexture } = useDecalTextures();

  useFrame((_, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        position={[-0.4, 0.05, 0]}
      >
        {snap.isFullTexture && fullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
            depthTest
            depthWrite
            polygonOffset
            polygonOffsetFactor={-1}
          />
        )}
        {snap.isLogoTexture && logoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite
            transparent
            polygonOffset
            polygonOffsetFactor={-10}
          />
        )}
      </mesh>
    </group>
  );
};

export default TShirt;
