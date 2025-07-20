import React from 'react';
import CustomButton from './CustomButton';
import './Mockup.css';
import { MockupChoose } from '../../data/MockupChoose';

const Choose = ({ setActiveModel }) => {
  return (
    <div className='choose-container'>
      <h2 className='choose-title'>Выберите модель</h2>
      <div className='choose-button-container'>
        {MockupChoose.map((item) => (
          <CustomButton
            key={item.id || Math.random()}
            type='filled'
            title={item.title}
            handleClick={() => setActiveModel(item.modelName)}
            customStyles='customStyles'
          />
        ))}
      </div>
    </div>
  )
}

export default Choose