import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import UserSelector from '../UserSelector';

describe('<UserSelector />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<UserSelector />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a placeholder attribute', () => {
    const renderedComponent = shallow(<UserSelector />);
    expect(renderedComponent.prop('placeholder')).toEqual('Select user');
  });

  it('should be clearable and searchable', () => {
    const renderedComponent = shallow(<UserSelector />);

    expect(renderedComponent.prop('isSearchable')).toBeDefined();
    expect(renderedComponent.prop('isClearable')).toBeDefined();
  });

  it('should show no user message when theres no matching option', () => {
    const renderedComponent = shallow(<UserSelector />);

    expect(renderedComponent.prop('noOptionsMessage')()).toEqual('No user');
  });

  it('should show valid value/label combination after right pickup', () => {
    const mockOption = fromJS({
      id: 1,
      name: 'John',
    });
    const renderedComponent = shallow(<UserSelector />);
    const labelExtractor = renderedComponent.prop('getOptionLabel');
    const valueExtractor = renderedComponent.prop('getOptionValue');

    expect(labelExtractor(mockOption)).toEqual('John');
    expect(valueExtractor(mockOption)).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const selected = { id: 1, name: 'John' };
    const renderedComponent = shallow(<UserSelector selected={selected} />);
    expect(renderedComponent.prop('value')).toEqual(selected);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<UserSelector attribute="test" />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
