import styled from 'styled-components';

const Th = styled.th`
  cursor: auto;
  background: #f9fafb;
  text-align: inherit;
  color: rgba(0, 0, 0, 0.87);
  padding: 0.92857143em 0.78571429em;
  vertical-align: inherit;
  font-weight: 700;
  text-transform: none;
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
  border-left: 1px solid rgba(34, 36, 38, 0.1);
  &:first-child {
    border-radius: 0.28rem;
    border-left: none;
  }
  &:last-child {
    border-radius: 0 0.28571429rem 0 0;
  }
`;

export default Th;
