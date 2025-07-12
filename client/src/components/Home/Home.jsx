import React, { useEffect } from 'react';
import SectionMain from '../MainBody/SectionMain';
import SectionAbout from '../AboutMe/SectionAbout';
import Contacts from '../Contacts/Contacts';
import Carousel from '../Skills/Carousel';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Steps from '../Steps/Steps';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        scroller.scrollTo(scrollTo, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -50,
        });
      }, 100);
    }
  }, [location]);

  return (
    <div showNone>
      <SectionMain />
      <SectionAbout />
      <Carousel />
      <Steps />
      <Contacts />
      <Footer />
    </div>
  );
};

export default Home;
