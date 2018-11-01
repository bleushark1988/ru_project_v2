import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Td from '../Td';

describe('<Td />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Td />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should be able to render disabled style', () => {
    const renderedComponent = renderer.create(<Td disabled />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Td />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Td id={id} disabled />);

    expect(renderedComponent.prop('id')).toEqual(id);
    expect(renderedComponent.prop('disabled')).toBeDefined();
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Td attribute="test" />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
