import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#efbd48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: '../../public/logo-prew.png',
  fullDecal: '../../public/texture.png'
});

export default state;