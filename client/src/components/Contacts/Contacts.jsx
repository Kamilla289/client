import React from 'react'
import { useState } from 'react'
import Sector from '../Desing/Sector'
import { contactsForm } from '../../data/contactsForm'
import BasicModal from '../Desing/ModalPolicy'
import './Contact.css'
import { Element } from 'react-scroll'

const Contacts = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleSubmit = () => {
    alert('форма отправлена');
  };


  return (
    <Element name='contacts'>
      <Sector noFlex none>
        <h2 className='title-contacts'>СВЯЖИТЕСЬ СО МНОЙ</h2>
        <div className="contacts-block">
          {contactsForm.map((data) => (
            <div key={data.id} className="contact-frame">
              <img src={data.icon} alt="" />
              <input className='input-form' type={data.type} placeholder={data.placeholder} required />
            </div>
          ))}
          <div className="policy">
            <input className='checkbox' checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" />
            <div className="text-policy">Согласие на <BasicModal /> </div>
          </div>
          <button onClick={handleSubmit} disabled={!isChecked} className='button-gradient'>Отправить</button>
        </div>
      </Sector>
    </Element>
  )
}

export default Contacts