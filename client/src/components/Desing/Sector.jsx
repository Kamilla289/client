import React from 'react'
import styled from 'styled-components';
import Arrow from '../../assets/image/Arrow.svg'
import ArrowUp from '../../assets/image/ArrowUp.svg'
import '../MainBody/SectionMain.css'

const StyledSector = styled.div`
  position: relative;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 100px 256px 66px 256px;
`;

const Sector = ({ children, noFlex, none, noneUp }) => {
  return <StyledSector style={{ display: noFlex ? "block" : "flex" }}>
    {children}
    <img style={{ display: none ? "none" : "block" }} className='arrow' src={Arrow} alt="Клацай вниз" />
    <img style={{ display: noneUp ? "none" : "block" }} className='arrow-up' src={ArrowUp} alt="Клацай вверх" />
  </StyledSector>;
};

export default Sector;
