import React from 'react'
import { useSnapshot } from 'valtio';
import state from '../../data/mokupData';
import Footer from '../Footer/Footer'
import { abilityData } from '../../data/ability-data'
import { Link } from 'react-router-dom'
import '../Ability/Ability.css'
import { AnimatePresence } from 'framer-motion';

const Ability = () => {
  const { header, demo } = abilityData;
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <div showNone>
          <div className="ability-block">
            <div className="header-block-ability">
              <h1 className="ability-title">{header.title}</h1>
              <p className="text-ability">{header.text}</p>
              <img src={header.image} alt="стрелка вниз" className="image-ability" />
            </div>
            <div className="link-block-ability">
              {demo.map((link) => (
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