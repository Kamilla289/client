import React, { useEffect, useState } from 'react'
import NavbarLink from '../../../data/navbar'
import { Link as ScrollLink } from 'react-scroll'
import './Navbar.css'
import { Link as RouterLink, useLocation } from 'react-router-dom'




const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`navigation ${scrolled ? 'small' : ''} main-mraz`}>

      <div className="navigation-bar">
        {NavbarLink.map((link) => {
          const routerLink = link.path.startsWith('/');

          if (!isHome) {
            return (
              <p key={link.id}>
                <RouterLink to="/" className="link">
                  {link.name}
                </RouterLink>
              </p>
            );
          }

          return routerLink ? (
            <p key={link.id}>
              <RouterLink to={link.path} className="link">
                {link.name}
              </RouterLink>
            </p>
          ) : (
            <p key={link.id}>
              <ScrollLink
                className="link"
                to={link.path}
                smooth={true}
                duration={800}
                offset={-50}
                spy={true}
                activeClass=""
              >
                {link.name}
              </ScrollLink>
            </p>
          );
        })}
      </div>
      <svg
        id="wave-effect"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 150 60"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="customGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(228, 244, 255, 1)" />
            <stop offset="100%" stopColor="rgba(172, 224, 255, 1)" />
          </linearGradient>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 
            58-10 88-10s
            58 10 88 10 
            58-10 88-10 
            58 10 88 10
            v30h-352z"
          />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="50" y="-10" fill="url(#customGradient)" />
        </g>
      </svg>
    </div>
  );

};


export default Navbar