import React from 'react';
import styled from 'styled-components';
import Arrow from '../../assets/image/Arrow.svg';
import ArrowDark from '../../assets/image/Arrow-dark.svg';
import { Link } from 'react-scroll';
import '../MainBody/SectionMain.css';
import './Scroll.css'
import { useTheme } from './Themes/ThemeContext';
import { useMediaQuery } from 'react-responsive';

const StyledSector = styled.div`
  height: 100vh;
  width:73%;
  padding: 30px 0;
  color: white;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 2rem;
`;

const ContentWrapper = styled.div`
  display: grid;
  gap: clamp(1rem, 2vw, 2rem);
  position: relative;

  /* По пропсу columns — десктопная сетка */
  grid-template-columns: ${({ columns }) =>
    columns === 2 ? '1fr 1fr' : '1fr'};

  /* Внутренние блоки могут слегка сжиматься, но сохраняют пропорции */
  > * {
    min-width: 0;
    width: 100%;
  }

  /* Мобильная версия — всегда одна колонка */
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    justify-items: center;   /* центрируем блоки */
    text-align: center;      /* центрируем текст */
  }
`;


const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Sector = ({ children, hideArrow, to, noHeight }) => {
  const validChildren = React.Children.toArray(children).filter(Boolean);
  const columns = validChildren.length >= 2 ? 2 : 1;
  const { theme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <StyledSector style={{ height: noHeight ? '100%' : '100vh' }}>
      <ContentWrapper columns={columns}>
        {validChildren}
      </ContentWrapper>

      {!hideArrow && !isMobile && to && (
        <BottomWrapper>
          <Link to={to} smooth={true} duration={500} offset={to === 'contacts' ? -90 : -20}>
            <img
              className="arrow"
              src={theme === 'dark' ? ArrowDark : Arrow}
              alt="Клацай вниз"
              style={{ display: 'block' }}
            />
          </Link>
        </BottomWrapper>
      )}
    </StyledSector>
  );
};

export default Sector;


