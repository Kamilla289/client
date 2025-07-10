import React from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from '../Themes/ThemeContext'
import './ToggleButton.css' // сюда добавим все твои стили

const ToggleButton = () => {
  const { theme, toggleTheme } = useTheme()
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      // Мапим scrollY от 0 до 100 к scale от 1 до 0.7, но не меньше 0.7
      const newScale = Math.max(0.8, 1 - scrollTop / 300)
      setScale(newScale)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <label className="switch" style={{ transform: `scale(${scale})`, transformOrigin: 'left top' }}>
      <input
        className="switch__input"
        type="checkbox"
        role="switch"
        onChange={toggleTheme}
        checked={theme === 'dark'}
      />
      <span className="switch__icon-wrapper">
        <svg className="switch__icon switch__icon--light" viewBox="0 0 12 12" width="12px" height="12px" aria-hidden="true">
          <g fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round">
            <circle cx="6" cy="6" r="2" />
            <g strokeDasharray="1.5 1.5">
              {[...Array(8)].map((_, i) => (
                <polyline
                  key={i}
                  points="6 10,6 11.5"
                  transform={`rotate(${i * 45},6,6)`}
                />
              ))}
            </g>
          </g>
        </svg>
        <svg className="switch__icon switch__icon--dark" viewBox="0 0 12 12" width="12px" height="12px" aria-hidden="true">
          <g fill="none" stroke="#fff" strokeWidth="1" strokeLinejoin="round" transform="rotate(-45,6,6)">
            <path d="m9,10c-2.209,0-4-1.791-4-4s1.791-4,4-4c.304,0,.598.041.883.105-.995-.992-2.367-1.605-3.883-1.605C2.962.5.5,2.962.5,6s2.462,5.5,5.5,5.5c1.516,0,2.888-.613,3.883-1.605-.285.064-.578.105-.883.105Z" />
          </g>
        </svg>
      </span>
    </label>
  )
}

export default ToggleButton