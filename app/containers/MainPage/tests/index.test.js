import React from 'react';
import { shallow } from 'enzyme';
// import { RelationsList } from 'containers/RelationsList';

import { MainPage /* mapDispatchToProps */ } from '../index';

describe('<MainPage />', () => {
  it('should render the relations list', () => {
    const noop = () => {};
    const renderedComponent = shallow(
      <MainPage
        loadUsers={noop}
        loadProjects={noop}
        loadRoles={noop}
        loadRelations={noop}
      />,
    );

    expect(renderedComponent.find('Connect(RelationsList)')).toHaveLength(1);
  });

  it('should load the users, projects, reoles, relations after its mounted', () => {
    const submitSpy = jest.fn();

    shallow(
      <MainPage
        loadUsers={submitSpy}
        loadProjects={submitSpy}
        loadRoles={submitSpy}
        loadRelations={submitSpy}
      />,
    );

    expect(submitSpy).toHaveBeenCalledTimes(4);
  });
});
