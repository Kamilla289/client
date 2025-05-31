import React from 'react'
import NavbarLink from '../../../data/navbar'
import { Link as ScrollLink } from 'react-scroll'
import './Navbar.css'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const Navbar = () => {

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className='navigation'>
      <div className='navigation-bar'>
        {NavbarLink.map((link) => {
          const routerLink = link.path.startsWith('/');

          if (!isHome) {
            return (
              <p key={link.id}>
                <RouterLink
                  to='/'
                  className="link"
                >
                  {link.name}
                </RouterLink>
              </p>
            )
          }
          return routerLink ? (
            <p key={link.id}>
              <RouterLink to={link.path} className='link'>
                {link.name}
              </RouterLink>
            </p>
          ) : (
            <p key={link.id}>
              <ScrollLink className="link" to={link.path}
                smooth={true}
                duration={800}
                offset={-50}
                spy={true}
                activeClass=''
              >{link.name}</ScrollLink>
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar