import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../../data/mokupData';
import { download } from '../../assets/mokup';
import { downloadCanvasToImage, reader } from '../../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../../config/constants';
import { fadeAnimation, slideAnimation } from '../../config/motion';
import { Choose, ColorPicker, FilePicker, Tab } from './index';
import './Mockup.css';
import { Link } from 'react-router-dom';
import CanvasModel from '../canvas';
import { a } from '@react-spring/three';

const Mokup = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });
  const [activeModel, setActiveModel] = useState('tshirt');

  const editorRef = useRef(null);



  // Закрытие редактора по клику вне блока
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editorRef.current &&
        !editorRef.current.contains(event.target)
      ) {
        setActiveEditorTab('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
          />
        );
      case 'choose':
        return <Choose setActiveModel={setActiveModel} />;
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
        break;
    }

    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab('');
    });
  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <>
          <motion.div key="custom" className="window-mockup" {...slideAnimation('left')}>
            <div className="mockup-container">
              <div className="editortabs-container tabs" ref={editorRef}>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="go-back" {...fadeAnimation}>
            <Link to="/abilities">
              <button className="button-gradient button-go-back">Назад</button>
            </Link>
          </motion.div>

          <motion.div className="filtertabs-container" {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}

      <CanvasModel modelName={activeModel} />
    </AnimatePresence>
  );
};

export default Mokup;
