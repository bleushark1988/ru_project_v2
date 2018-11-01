import styled, { css } from 'styled-components';

const Td = styled.td`
  padding: 0.78571429em 0.78571429em;
  text-align: inherit;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
  border-left: 1px solid rgba(34, 36, 38, 0.1);
  &:first-child {
    border-left: none;
  }
  ${props =>
    props.disabled &&
    css`
      color: rgba(40, 40, 40, 0.3);
    `};
`;

export default Td;
