import React from 'react';
import CustomButton from './CustomButton';
import './Mockup.css';

const Choose = () => {
  return (
    <div className='choose-container'>
      <h2 className='choose-title'>Выберите модель</h2>
      <div className='choose-button-container'>
        <CustomButton className='choose-button' type='filled' title='Футболка' handleClick={() => { }} />
        <CustomButton className='choose-button' type='filled' title='Худи' handleClick={() => { }} />
        <CustomButton className='choose-button' type='filled' title='Рубашка' handleClick={() => { }} />
        <CustomButton className='choose-button' type='filled' title='Сумка' handleClick={() => { }} />
        <CustomButton className='choose-button' type='filled' title='Пакет' handleClick={() => { }} />
      </div>
    </div>
  )
}

export default Choose