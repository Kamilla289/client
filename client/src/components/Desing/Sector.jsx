import React from 'react';
import styled from 'styled-components';
import Arrow from '../../assets/image/Arrow.svg';
import ArrowDark from '../../assets/image/Arrow-dark.svg';
import { Link } from 'react-scroll';
import '../MainBody/SectionMain.css';
import './Scroll.css'
import { useTheme } from './Themes/ThemeContext';

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
  gap: 2rem;
  align-items: center;

  ${({ columns }) =>
    columns === 2
      ? `grid-template-columns: 1fr 1fr;`
      : `grid-template-columns: 1fr;`}
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

  return (
    <StyledSector style={{ height: noHeight ? '100%' : '100vh' }}>
      <ContentWrapper columns={columns}>
        {validChildren}
      </ContentWrapper>

      {!hideArrow && to && (
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


