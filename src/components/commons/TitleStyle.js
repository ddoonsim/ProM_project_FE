import styled, { css } from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';

const { large, extraLarge } = sizeNames;

export const MainTitle = styled.h1`
  font-size: ${extraLarge};
  padding: 20px 0 10px 0;
  margin: 0 0 20px;
  color: ${({ color }) => (color ? colorNames[color] : '#000')};
  border-bottom: ${({borderBottom}) => borderBottom || "2px solid"};
    ${({ color }) => (color ? colorNames[color] : '#000')};
`;

export const SubTitle = styled.h2`
  font-size: ${large};
  margin: 0 30px;
  padding: 0 30px;
  text-align: ${({ align }) => align || 'left'};
  color: ${({ color }) => (color ? colorNames[color] : '#000')};
  ${({ border_width, color }) =>
    border_width &&
    css`
      padding-bottom: 10px;
      border-bottom: ${border_width}px solid ${color ? color : '#000'};
    `}

  margin-bottom: 20px;
`;
