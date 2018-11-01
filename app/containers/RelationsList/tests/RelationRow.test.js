/**
 * Test the repo list item
 */

import React from 'react';
import { shallow, render } from 'enzyme';
import { fromJS } from 'immutable';
import { IntlProvider } from 'react-intl';

import Tr from '../Tr';
import { RelationRow } from '../RelationRow';
import UserSelector from '../UserSelector';

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <RelationRow {...props} />
    </IntlProvider>,
  );

describe('<RelationRow />', () => {
  let project;
  let role;
  let user;
  let userList;

  // Before each test reset the item data for safety
  beforeEach(() => {
    project = fromJS({ id: 1, name: 'Climb mountain' });
    role = fromJS({ id: 1, name: 'Admin' });
    user = fromJS({ id: 2, name: 'Jane' });
    userList = fromJS([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
  });

  it('should render a Tr', () => {
    const renderedComponent = shallow(
      <RelationRow project={project} role={role} />,
    );
    expect(renderedComponent.find(Tr).length).toBe(1);
  });

  it('should render the user selector', () => {
    const renderedComponent = shallow(
      <RelationRow project={project} role={role} />,
    );

    expect(renderedComponent.find(UserSelector).length).toBe(1);
  });

  it('should render the project name', () => {
    const renderedComponent = renderComponent({ project, role, userList });
    expect(renderedComponent.text()).toContain(project.get('name'));
  });

  it('should render the role name', () => {
    const renderedComponent = renderComponent({ project, role, userList });
    expect(renderedComponent.text()).toContain(role.get('name'));
  });

  it('should show selected user name', () => {
    const renderedComponent = renderComponent({
      project,
      role,
      user,
      userList,
    });

    expect(renderedComponent.text()).toContain(user.get('name'));
  });

  it('should add new relation when user is selected', () => {
    const addRelation = jest.fn();
    const renderedComponent = shallow(
      <RelationRow
        project={project}
        role={role}
        userList={userList}
        addRelation={addRelation}
      />,
    );
    const actionType = { action: 'select-option' };

    renderedComponent.instance().handleChangeUser(user, actionType);
    expect(addRelation).toHaveBeenCalled();
  });

  it('should remove relation when clear the user selection', () => {
    const removeRelation = jest.fn();
    const renderedComponent = shallow(
      <RelationRow
        project={project}
        role={role}
        user={user}
        userList={userList}
        removeRelation={removeRelation}
      />,
    );
    const actionType = { action: 'clear' };

    renderedComponent.instance().handleChangeUser(user, actionType);
    expect(removeRelation).toHaveBeenCalled();
  });
});
