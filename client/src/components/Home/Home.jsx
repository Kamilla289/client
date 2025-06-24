import React from 'react'
import SectionMain from '../MainBody/SectionMain'
import SectionAbout from '../AboutMe/SectionAbout'
import Contacts from '../Contacts/Contacts'
import Carousel from '../Skills/Carousel'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Element } from 'react-scroll'
import Footer from '../Footer/Footer'

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  return (
    <>
      <SectionMain />
      <SectionAbout />
      <Carousel />
      <Contacts />
      <Footer />
    </>
  )
}

export default Home