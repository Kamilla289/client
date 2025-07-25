import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets/mokup";
import * as THREE from 'three';

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "choose",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    nameFilter: "logoShirt",
    icon: logoShirt,
  },
  {
    nameFilter: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};

