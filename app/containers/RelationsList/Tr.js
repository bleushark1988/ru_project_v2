import styled, { css } from 'styled-components';
import Td from './Td';

const Tr = styled.tr`
  ${props =>
    props.positive &&
    css`
      background: #fcfff5;
      color: #2c662d;

      & > ${Td.selector} {
        background: #fcfff5;
        color: #2c662d;
      }
    `};
`;

export default Tr;
