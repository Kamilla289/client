import React, { useEffect, useState, createContext, useContext } from 'react'

const Context = createContext()

// Компонент-контейнер
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <Context.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        {children}
      </div>
    </Context.Provider>
  )
}

// Хук для использования контекста
export const useTheme = () => useContext(Context)
