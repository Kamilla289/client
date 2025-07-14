import React from 'react';
import * as THREE from 'three';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Decal, useTexture } from '@react-three/drei';
import state from '../../data/mokupData';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('../../../public/shirt_baked.glb');

  // Загружаем текстуры
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Устанавливаем параметры для обеих текстур
  [logoTexture, fullTexture].forEach((texture) => {
    if (texture) {
      texture.anisotropy = 16;
      texture.needsUpdate = true;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
    }
  });

  // Обновление цвета через maath easing
  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap); // ключ для рендера

  return (
    <group key={stateString}>
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
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
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
            transparent={true}
            polygonOffset
            polygonOffsetFactor={-10}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
