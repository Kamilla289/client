import React from 'react'
import { useSnapshot } from 'valtio';
import state from '../../data/mokupData';
import Footer from '../Footer/Footer'
import { abilityData } from '../../data/ability-data'
import { Link } from 'react-router-dom'
import '../Ability/Ability.css'
import { AnimatePresence, motion } from 'framer-motion';
import { slideAnimation } from '../../config/motion';
import { useTheme } from '../Desing/Themes/ThemeContext';

const Ability = () => {
  const { header, demo } = abilityData;
  const snap = useSnapshot(state);
  const { theme } = useTheme();

  return (
    <AnimatePresence>
      {snap.intro && (
        <div showNone>
          <div className="ability-block">
            <motion.div {...slideAnimation('down')}>
              <div className="header-block-ability">
                <h1 className="ability-title">{header.title}</h1>
                <p className="text-ability">{header.text}</p>
                <img src={theme === 'dark' ? header.imageDark : header.image} alt="стрелка вниз" className="image-ability" />
              </div>
            </motion.div>
            <div className="link-block-ability">
              {demo.map((link) => (
                <motion.div {...slideAnimation('left')}>
                  <div className="item-ability" key={link.id}>
                    <div className="item-left-block">
                      <h2 className="title-item">{link.title}</h2>
                      <p className="text-item">{link.text}</p>
                      <Link to={link.link} >
                        <button className='button-gradient'>Попробовать</button>
                      </Link>
                    </div>
                    <img src={link.image} alt="символическое изображение" className="image-item" />
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-resum">...Скоро здесь появится больше интересного</p>
          </div>
          <Footer noneImage />
        </div>
      )}
    </AnimatePresence>
  )
}

export default Ability