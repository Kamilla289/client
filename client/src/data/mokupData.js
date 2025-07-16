import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#efbd48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: '/logo-prew.png',
  fullDecal: '/texture.png'
});

export default state;