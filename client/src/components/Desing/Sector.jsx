import React from 'react'
import styled from 'styled-components';
import Arrow from '../../assets/image/Arrow.svg'
import '../MainBody/SectionMain.css'

const StyledSector = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 100px 256px 66px 256px;
`;

const Sector = ({ children }) => {
  return <StyledSector>
    {children}
    <img className='arrow' src={Arrow} alt="Клацай вниз" />
  </StyledSector>;
};

export default Sector;
