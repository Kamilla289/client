import React from 'react'
import Sector from '../Desing/Sector'
import { footerData } from '../../data/footerData'
import './Footer.css'
import Heart from '../../assets/image/heart.png'

const Footer = ({ noneImage }) => {
  const { contacts, copyright, design, social } = footerData

  return (
    <div className="main-mraz">
      <Sector noHeight noneUp>
        <div className="footer-block-mraz">
          <div className="line"></div>
          <div className="footer">
            <div className="footer-right">
              <div className="footer-right-item">
                <a className='email' href={`mailto:${contacts.email}`}>{contacts.email}</a>
                <address>{contacts.address}</address>
                <a className='phone' href={`tel:${contacts.phone}`}>{contacts.phone}</a>
                <p className="copyright">{copyright}</p>
                <p className="design">{design}</p>
              </div>
            </div>

            <div className="footer-left">
              <img src={Heart} alt="" className='heart-image' style={{ display: noneImage ? 'none' : 'block' }} />
              <div className="footer-left-item">
                <h3 className="social-title">{social.title}</h3>
                <div className="social-icons">
                  {social.icons.map((icon, index) => (
                    <img
                      key={index}
                      src={icon}
                      alt={`social-${index}`}
                      className="social-icon"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sector>
    </div>
  )
}



export default Footer