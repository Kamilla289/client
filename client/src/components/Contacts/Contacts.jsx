import React, { useEffect } from 'react'
import { useState } from 'react'
import Sector from '../Desing/Sector'
import { contactsForm } from '../../data/contactsForm'
import BasicModal from '../Desing/ModalPolicy'
import './Contact.css'
import { Element } from 'react-scroll'
import message from '../../assets/image/contactsImage/message.svg'

const Contacts = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputSubmit, setInputSubmit] = useState({});
  const allFields = contactsForm.every((field) => (inputSubmit[field.index]?.trim()));

  useEffect(() => {
    if (!allFields && isChecked) {
      setIsChecked(false);
    }
  }, [isChecked, allFields])


  const handleCheckboxChange = (e) => {
    if (allFields) {
      setIsChecked(e.target.checked)
    }
  }

  const handleInputSubmit = (e, index) => {
    setInputSubmit((prev) => ({
      ...prev,
      [index]: e.target.value,
    }))
  }

  const handleSubmit = () => {
    alert('форма отправлена');
  };

  return (
    <Element name='contacts' id='contacts' className='main-mraz'>
      <Sector noHeight>
        <div className="contact-block-mraz">
          <h2 className='title-contacts'>СВЯЖИТЕСЬ СО МНОЙ</h2>
          <div className="contacts-block">
            {contactsForm.map((data) => (
              <div key={data.index} className="contact-frame">
                <img src={data.icon} alt="" />
                <input value={inputSubmit[data.index || '']} onChange={(e) => handleInputSubmit(e, data.index)} id={data.id} className='input-form' type={data.type} placeholder={data.placeholder} required />
              </div>
            ))}
            <div className="contact-frame frame-textarea">
              <img src={message} alt="" />
              <textarea className='input-form' id="message"></textarea>
            </div>
            <div className="policy">
              <label class="custom-checkbox">
                <input className='checkbox' disabled={!allFields} checked={isChecked} onChange={handleCheckboxChange} type="checkbox" />
                <span className="checkbox-box">
                  <svg style={{ display: isChecked ? 'block' : 'none' }} className="checkmark" width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.50098 13.9995L13.6206 29.5818C14.5068 30.7213 16.2715 30.5752 16.9583 29.3056L32.001 1.49951" stroke="#B6FF5C" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </span>
              </label>
              <div className="text-policy">Согласие на <BasicModal /> </div>
            </div>
            <button onClick={handleSubmit} disabled={!isChecked} className='button-gradient'>Отправить</button>
          </div>
        </div>
      </Sector>
    </Element>
  )
}

export default Contacts