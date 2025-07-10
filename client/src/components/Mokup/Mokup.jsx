import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '../../config/config';
import state from '../../data/mokupData';
import { download } from '../../assets/mokup';
import { downloadCanvasToImage, reader } from '../../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../../config/constants';
import { fadeAnimation, slideAnimation } from '../../config/motion';
import { AIPicker, ColorPicker, FilePicker, Tab } from './index';
import './Mockup.css'
import { Link } from 'react-router-dom';
import CanvasModel from '../canvas';

const Mokup = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile} />;
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }
  };

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab('');
      });
  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <>
          <motion.div key='custom' className='window-mockup' {...slideAnimation('left')}>
            <div className="mockup-container">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className='go-back' {...fadeAnimation}>
            <Link to={'/abilities'}>
              <button className='button-gradient button-go-back' >Назад</button>
            </Link>
          </motion.div>

          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab key={tab.name} tab={tab} isFilterTab isActiveTab='' handleClick={() => { }} />
            ))}
          </motion.div>
        </>
      )}

      <CanvasModel />
    </AnimatePresence>
  );
};

export default Mokup;
