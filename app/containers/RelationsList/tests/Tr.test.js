import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Tr from '../Tr';

describe('<Tr />', () => {
  it('should render an <tr> tag', () => {
    const renderedComponent = shallow(<Tr />);
    expect(renderedComponent.type()).toEqual('tr');
  });

  it('should render colorful background when positive props is enabled', () => {
    const renderedComponent = renderer.create(<Tr positive />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent).toHaveStyleRule('background', '#fcfff5');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Tr />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Tr id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Tr attribute="test" />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
