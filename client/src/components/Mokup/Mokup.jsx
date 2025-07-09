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

const Mokup = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro && (
        <>
          <motion.div key='custom' className='window-mockup' {...slideAnimation('left')}>
            <div className="mockup-container">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => { }} />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div className='go-back' {...fadeAnimation}>
            <button className='button-gradient button-go-back'>Назад</button>
          </motion.div>
          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab key={tab.name} tab={tab} isFilterTab isActiveTab='' handleClick={() => { }} />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Mokup