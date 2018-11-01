/**
 * Test the repo list item
 */

import React from 'react';
import { fromJS } from 'immutable';
import { shallow /* , render */ } from 'enzyme';

import LoadingIndicator from 'components/LoadingIndicator';
import { RelationsList } from '../index';
import RelationRow from '../RelationRow';
import Table from '../Table';
import Th from '../Th';

describe('<RelationsList />', () => {
  let relations;

  // Before each test reset the item data for safety
  beforeEach(() => {
    relations = fromJS([
      [
        { id: 1, name: 'Project 1' },
        { id: 1, name: 'Admin' },
        { id: 2, name: 'John' },
      ],
      [{ id: 1, name: 'Project 1' }, { id: 2, name: 'Editor' }, null],
      [{ id: 2, name: 'Project 2' }, { id: 1, name: 'Admin' }, null],
      [
        { id: 2, name: 'Project 2' },
        { id: 2, name: 'Admin' },
        { id: 2, name: 'John' },
      ],
    ]);
  });

  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(<RelationsList loading />);
    expect(renderedComponent.contains(<LoadingIndicator />)).toEqual(true);
  });

  it('should render a Table', () => {
    const renderedComponent = shallow(<RelationsList relations={relations} />);
    expect(renderedComponent.find(Table).length).toBe(1);
  });

  it('should render 3 columns', () => {
    const renderedComponent = shallow(<RelationsList relations={relations} />);
    expect(renderedComponent.find(Th).length).toBe(3);
  });

  it('should pass all items props to rendered component', () => {
    const renderedComponent = shallow(<RelationsList relations={relations} />);

    expect(renderedComponent.find(RelationRow)).toHaveLength(relations.size);
  });

  it('should render emptypass all items props to rendered component', () => {
    const renderedComponent = shallow(<RelationsList relations={relations} />);

    expect(renderedComponent.find(RelationRow)).toHaveLength(relations.size);
    expect(
      renderedComponent
        .find(RelationRow)
        .at(0)
        .prop('project'),
    ).toBe(relations.getIn([0, 0]));
    expect(
      renderedComponent
        .find(RelationRow)
        .at(0)
        .prop('role'),
    ).toBe(relations.getIn([0, 1]));
    expect(
      renderedComponent
        .find(RelationRow)
        .at(0)
        .prop('user'),
    ).toBe(relations.getIn([0, 2]));
  });
});
