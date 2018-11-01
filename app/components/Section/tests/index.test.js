import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Section from '../index';

describe('<Section />', () => {
  it('should render an <section> tag', () => {
    const renderedComponent = shallow(<Section />);
    expect(renderedComponent.type()).toEqual('section');
  });

  it('should render text center aligned when textCenter props is enabled', () => {
    const renderedComponent = renderer.create(<Section textCenter />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent).toHaveStyleRule('text-align', 'center');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Section />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Section id={id} textCenter />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Section attribute="test" />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
