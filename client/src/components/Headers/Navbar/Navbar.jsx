import React from 'react'
import NavbarLink from '../../../data/navbar'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <div className='navigation-bar'>
        {NavbarLink.map((link) => (
          <p key={link.id}>
            <Link to={link.path}>{link.name}</Link>
          </p>
        ))}
      </div>
    </div>
  )
}

export default Navbar