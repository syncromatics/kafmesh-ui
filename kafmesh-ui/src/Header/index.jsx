import React from 'react';
import styled from 'styled-components';
import { trackFontHeavy } from '../styles/Font';

const HeaderContainer = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const HeaderItems = styled.span`
  ${trackFontHeavy}
  margin: 13px 0;
`;

const Header = () => (
  <HeaderContainer>
    <HeaderItems>Kafmesh</HeaderItems>
  </HeaderContainer>
);

export default Header;
