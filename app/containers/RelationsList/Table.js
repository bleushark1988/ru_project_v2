import styled from 'styled-components';
import Td from './Td';

const Table = styled.table`
  width: 100%;
  background: #fff;
  margin: 1em 0;
  border: 1px solid rgba(34, 36, 38, 0.15);
  box-shadow: none;
  border-radius: .28rem;
  text-align: left;
  color: rgba(0,0,0,.87);
  border-collaps 0, 0, 0eparate;
  border-spacing: 0;
  font-size: 14px;

  tr:first-child ${Td.selector} {
    border-top: none;
  }
`;

export default Table;
