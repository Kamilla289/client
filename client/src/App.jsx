import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Header from './components/Headers/Header'
import Ability from './components/Ability/Ability'
import ScrollTopButton from './components/Desing/ScrollTopButton'



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/abilities' element={<Ability />} />
      </Routes>
      <ScrollTopButton />
    </>
  )
}

export default App
