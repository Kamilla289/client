import React from 'react';
import styled from 'styled-components';
import Arrow from '../../assets/image/Arrow.svg';
import { Link } from 'react-scroll';
import '../MainBody/SectionMain.css';
import './Scroll.css'

const StyledSector = styled.div`
  height: 100vh;
  width:73%;
  padding: 2rem 0;
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

  return (
    <StyledSector style={{ height: noHeight ? '100%' : '90vh' }}>
      <ContentWrapper columns={columns}>
        {validChildren}
      </ContentWrapper>

      {!hideArrow && to && (
        <BottomWrapper>
          <Link to={to} smooth={true} duration={500}>
            <img
              className="arrow"
              src={Arrow}
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


