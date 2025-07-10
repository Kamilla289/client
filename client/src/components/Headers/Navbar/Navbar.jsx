import React, { useEffect, useState } from 'react';
import NavbarLink from '../../../data/navbar';
import { Link as ScrollLink } from 'react-scroll';
import './Navbar.css';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../Desing/Themes/ThemeContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

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
                    offset={-50}
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
            <stop offset="0%" stopColor="#CEFF93" />
            <stop offset="100%" stopColor="#CEFF93" />
          </linearGradient>

          <linearGradient id="customGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#723A8E" />
            <stop offset="100%" stopColor="#723A8E" />
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
          <use xlinkHref="#gentle-wave" x="50" y="-10" fill={theme === 'dark' ? 'url(#customGradientDark)' : 'url(#customGradient)'} />
        </g>
      </svg>
    </div>
  );
};

export default Navbar;
