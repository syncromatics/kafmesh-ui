import { css } from 'styled-components';
import colors from './Colors';

export const trackFont = () => css`
  font-family: 'AvenirNext-Medium', 'Avenir Next W01', sans-serif;
  font-style: normal;
  font-weight: 500;
  color: ${colors.textOnBG};
  font-size: 16px;
`;

export const trackFontSmall = () => css`
  ${trackFont}
  font-size: 14px;
`;

export const trackFontHeavy = () => css`
  ${trackFont}
  font-family: 'AvenirNext-Bold', 'AvenirNext-Medium', 'Avenir Next W01', sans-serif;
  font-weight: bold;
`;

export const trackFontHeavySmall = () => css`
  ${trackFont}
  font-size: 16px;
  font-weight: bold;
`;
