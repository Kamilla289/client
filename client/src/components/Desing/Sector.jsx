// import React from 'react';
// import styled from 'styled-components';
// import Arrow from '../../assets/image/Arrow.svg';
// import { Link } from 'react-scroll';
// import '../MainBody/SectionMain.css';

// const StyledSector = styled.div`
//   height: 100vh;
//   padding: 2rem;
//   color: white;
//   display: grid;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   grid-template-rows: repeat(2, 1fr);
// 	grid-template-columns: repeat(2, 1fr);
// `;

// const Sector = ({ children, noGrid, hideArrow, to, noHeight }) => {
//   return (
//     <StyledSector style={{ display: noGrid ? 'grid' : 'block', height: noHeight ? '100vh' : '' }}>
//       {children}

//       {/* Кнопка со стрелкой вниз — ведёт к следующей секции, если указан to */}
//       {to && !hideArrow && (
//         <Link to={to} smooth={true} duration={500}>
//           <img
//             className="arrow"
//             src={Arrow}
//             alt="Клацай вниз"
//             style={{ display: 'block' }}
//           />
//         </Link>
//       )}
//     </StyledSector>
//   );
// };

// export default Sector;

import React from 'react';
import styled from 'styled-components';
import Arrow from '../../assets/image/Arrow.svg';
import { Link } from 'react-scroll';
import '../MainBody/SectionMain.css';

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


