import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Section = styled.section`
  margin: 3em auto;

  &:first-child {
    margin-top: 0;
  }
  ${props =>
    props.textCenter &&
    css`
      text-align: center;
    `};
`;

Section.propTypes = {
  textCenter: PropTypes.bool,
};

export default Section;
