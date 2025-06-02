import React from 'react';
import styled from 'styled-components';
import Arrow from '../../assets/image/Arrow.svg';
import { Link } from 'react-scroll';
import '../MainBody/SectionMain.css';

const StyledSector = styled.div`
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 100px 256px 66px 256px;
  display: flex;
  position: relative;
`;

const Sector = ({ children, noFlex, hideArrow, to }) => {
  return (
    <StyledSector style={{ display: noFlex ? 'block' : 'flex' }}>
      {children}

      {/* Кнопка со стрелкой вниз — ведёт к следующей секции, если указан to */}
      {to && !hideArrow && (
        <Link to={to} smooth={true} duration={500}>
          <img
            className="arrow"
            src={Arrow}
            alt="Клацай вниз"
            style={{ display: 'block' }}
          />
        </Link>
      )}
    </StyledSector>
  );
};

export default Sector;

