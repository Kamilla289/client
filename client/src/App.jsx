import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Header from './components/Headers/Header'
import Ability from './components/Ability/Ability'
import ScrollTopButton from './components/Desing/ScrollTopButton'
import Mokup from './components/Mokup/Mokup'
import CanvasModel from '../src/components/canvas'
import { ThemeProvider } from './components/Desing/Themes/ThemeContext'
import ToggleButton from './components/Desing/ButtonTheme/ButtonTheme'



function App() {
  const location = useLocation();
  return (
    <ThemeProvider>
      <>
        {(location.pathname !== '/mokup' && location.pathname !== '/game') && <Header />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/abilities' element={<Ability />} />
          <Route path='/mokup' element={<Mokup />} />
        </Routes>
        <ScrollTopButton />
        <ToggleButton />
      </>
    </ThemeProvider>
  )
}

export default App
