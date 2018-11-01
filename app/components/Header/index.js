import React from 'react';

import A from './A';
import Img from './Img';
import Banner from './banner.jpg';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
      </div>
    );
  }
}

export default Header;
