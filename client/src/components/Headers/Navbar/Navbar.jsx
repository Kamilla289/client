import React, { useEffect, useState } from 'react';
import NavbarLink from '../../../data/navbar';
import { Link as ScrollLink } from 'react-scroll';
import './Navbar.css';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../Desing/Themes/ThemeContext';
import { footerData } from '../../../data/footerData';
import { useMediaQuery } from 'react-responsive'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { contacts } = footerData;
  const { theme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!isMobile ? (
        <div className={`navigation ${scrolled ? 'small' : ''} main-mraz`}>
          <div className="navigation-bar">
            {NavbarLink.map((link) => {
              const isRouterLink = link.path.startsWith('/');

              // 1. Для /abilities
              if (link.path === '/abilities') {
                return (
                  <p key={link.id}>
                    <RouterLink
                      to={link.path}
                      className="link"
                      onClick={(e) => {
                        if (location.pathname === '/abilities') {
                          e.preventDefault();
                          window.location.reload(); // повторный клик
                        }
                      }}
                    >
                      {link.name}
                    </RouterLink>
                  </p>
                );
              }

              // 2. Для якорей (scroll-ссылок)
              if (!isRouterLink) {
                return (
                  <p key={link.id}>
                    {location.pathname === '/' ? (
                      // если мы уже на главной, скроллим через react-scroll
                      <ScrollLink
                        className="link"
                        to={link.path}
                        smooth={true}
                        duration={800}
                        offset={link.path === 'contacts' ? -90 : -20}
                        spy={true}
                        activeClass=""
                      >
                        {link.name}
                      </ScrollLink>
                    ) : (
                      // если мы НЕ на главной — перейти на главную с hash
                      <RouterLink
                        to={`/#${link.path}`}
                        className="link"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/', { state: { scrollTo: link.path } });
                        }}
                      >
                        {link.name}
                      </RouterLink>
                    )}
                  </p>
                );
              }

              // 3. Остальные router-ссылки
              return (
                <p key={link.id}>
                  <RouterLink to={link.path} className="link">
                    {link.name}
                  </RouterLink>
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
                <stop offset="0%" stopColor="#d5fda3ff" />
                <stop offset="100%" stopColor="#d5fda3ff" />
              </linearGradient>

              <linearGradient id="customGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#723A8E" />
                <stop offset="100%" stopColor="#723A8E" />
              </linearGradient>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 
              58-5 88-5s
              58 5 88 5 
              58-5 88-5 
              58 5 88 5
              v30h-352z"
              />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="50" y="0" fill={theme === 'dark' ? 'url(#customGradientDark)' : 'url(#customGradient)'} />
            </g>
          </svg>
        </div>
      ) : (
        <div className={`navigation ${isOpen ? "menu-open" : ""} ${theme === "dark" ? "dark" : ""
          }`}>
          <div className="navigation-bar mobile-navigation">
            <div className="nav-left">
              <svg width="83" height="59" viewBox="0 0 83 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M83 0H0V59H59C64.5229 59 69 54.5228 69 49V48C69 40.268 75.268 34 83 34V0Z" fill={theme === 'dark' ? '#723A8E' : '#D5FDA3'} />
              </svg>
            </div>
            <div className="nav-center" style={{ backgroundColor: theme === 'dark' ? '#723a8e' : '#D5FDA3' }}></div>
            <div className="nav-right">
              <svg width="127" height="59" viewBox="0 0 127 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H127V59H39.9518C33.0483 59 27.4518 53.4036 27.4518 46.5C27.4518 39.5964 21.8554 34 14.9518 34H0V0Z" fill={theme === 'dark' ? '#723A8E' : '#D5FDA3'} />
              </svg>
              <div className={`burger-menu ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}>
                <div className={`line1 ${isOpen ? "active" : ""}`}></div>
                <div className={`line2 ${isOpen ? "active" : ""}`}></div>
                <div className={`line3 ${isOpen ? "active" : ""}`}></div>
              </div>
            </div>
          </div>

          {/* Мобильное меню */}
          <div className={`mobile-menu ${isOpen ? "show" : ""}`} style={{ backgroundColor: theme === 'dark' ? 'rgba(0, 60, 91, 0.95)' : 'rgba(163, 224, 255, 0.95)' }}>
            <ul>
              {NavbarLink.map((link) => {
                const isRouterLink = link.path.startsWith('/');

                // Обычные роут-ссылки
                if (isRouterLink) {
                  return (
                    <li key={link.id}>
                      <RouterLink
                        to={link.path}
                        className="link mobile-link"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </RouterLink>
                    </li>
                  );
                }

                // Якоря: если уже на главной — ScrollLink
                if (location.pathname === '/') {
                  return (
                    <li key={link.id}>
                      <ScrollLink
                        to={link.path}
                        smooth={true}
                        duration={800}
                        offset={link.path === 'contacts' ? -90 : -20}
                        className={`link mobile-link ${isOpen ? "show" : ""}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </ScrollLink>
                    </li>
                  );
                }

                // Якоря: если НЕ на главной — перейти на / и прокрутить после монтирования
                return (
                  <li key={link.id}>
                    <RouterLink
                      to={`/#${link.path}`}
                      className="link mobile-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        navigate('/', { state: { scrollTo: link.path } });
                      }}
                    >
                      {link.name}
                    </RouterLink>
                  </li>
                );
              })}
            </ul>

            <div className="line-section"></div>
            <div className="contact-section">
              <a className='email mobile-contacts' href={`mailto:${contacts.email}`}>{contacts.email}</a>
              <address className='mobile-contacts'>{contacts.address}</address>
              <a className='phone mobile-contacts' href={`tel:${contacts.phone}`}>{contacts.phone}</a>
            </div>
          </div>
        </div >
      )}
    </>
  );
};

export default Navbar;
