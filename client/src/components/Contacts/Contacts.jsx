import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Sector from '../Desing/Sector'
import { contactsForm } from '../../data/contactsForm'
import BasicModal from '../Desing/ModalPolicy'
import './Contact.css'
import { Element } from 'react-scroll'
import message from '../../assets/image/contactsImage/message.svg'
import { useTheme } from '../Desing/Themes/ThemeContext'

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

  const handleSubmit = async () => {
    let text = '<b>Новая заявка сайта</b>\n';
    contactsForm.forEach((field) => {
      const value = inputSubmit[field.index] || "-";
      text += `<b>${field.placeholder}</b> : ${value}\n`
    });
    const messageValue = document.getElementById('message').value || '-';
    text += `<b>Сообщение</b> : ${messageValue}\n`;
    try {
      await sendTelegram(text);
      alert('Форма отправлена');
      setInputSubmit({});
      document.getElementById('message').value = '';
      setIsChecked(false);
    } catch (error) {
      console.error(error)
      alert('пошел нахуй');
    }
  };

  const sendTelegram = async (message) => {
    const token = '7757955888:AAFeVcPbVtOIESbGRgvCC9_g6xnRhtsfTqk';
    const id = '1692857185';
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    await axios.post(url, {
      chat_id: id,
      text: message,
      parse_mode: 'HTML',

    })
  }

  const { theme } = useTheme();

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
                  <svg style={{ display: isChecked ? 'block' : 'none' }} className="checkmark" width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.50098 13.9995L13.6206 29.5818C14.5068 30.7213 16.2715 30.5752 16.9583 29.3056L32.001 1.49951" stroke={theme === 'dark' ? "#a500bb" : "#B6FF5C"} stroke-width="3" stroke-linecap="round" />
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