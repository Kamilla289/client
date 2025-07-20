import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { useTexture } from '@react-three/drei';
import state from '../data/mokupData';

const useDecalTextures = () => {
  const snap = useSnapshot(state);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  [logoTexture, fullTexture].forEach((texture) => {
    if (texture) {
      texture.anisotropy = 16;
      texture.needsUpdate = true;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
    }
  });

  return { snap, logoTexture, fullTexture };
};


export default useDecalTextures;