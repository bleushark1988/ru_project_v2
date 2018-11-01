import { fromJS } from 'immutable';

import {
  selectMain,
  makeSelectLoading,
  makeSelectError,
  makeSelectProjects,
  makeSelectRoles,
  makeSelectUsers,
  makeSelectNormalizedRelations,
} from '../selectors';

describe('selectMain', () => {
  it('should select the main state', () => {
    const mainState = fromJS({});
    const mockedState = fromJS({
      main: mainState,
    });
    expect(selectMain(mockedState)).toEqual(mainState);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the aggregated loading from entities', () => {
    const loading = false;
    const mockedState = fromJS({
      main: {
        projects: { loading },
        users: { loading },
        roles: { loading },
        relations: { loading },
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });

  it('should select true if any of loading is true', () => {
    const loading = false;
    const mockedState = fromJS({
      main: {
        projects: { loading },
        users: { loading: !loading },
        roles: { loading },
        relations: { loading },
      },
    });
    expect(loadingSelector(mockedState)).toEqual(!loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should return aggregated array of the errors', () => {
    const error = 404;
    const mockedState = fromJS({
      main: {
        projects: { error },
        roles: { error },
        users: { error },
        relations: { error },
      },
    });
    expect(errorSelector(mockedState)).toEqual([error, error, error, error]);
  });

  it('should strip empty error', () => {
    const error = 404;
    const mockedState = fromJS({
      main: {
        projects: { error: null },
        roles: { error },
        users: { error: null },
        relations: { error: null },
      },
    });

    expect(errorSelector(mockedState)).toEqual([error]);
  });
});

describe('makeSelectProjects', () => {
  const projectsSelector = makeSelectProjects();
  it('should select the projects', () => {
    const projects = fromJS([]);
    const mockedState = fromJS({
      main: {
        projects: {
          data: projects,
        },
      },
    });

    expect(projectsSelector(mockedState)).toEqual(projects);
  });
});

describe('makeSelectUsers', () => {
  const usersSelector = makeSelectUsers();
  it('should select the users', () => {
    const users = fromJS([]);
    const mockedState = fromJS({
      main: {
        users: {
          data: users,
        },
      },
    });

    expect(usersSelector(mockedState)).toEqual(users);
  });
});

describe('makeSelectRoles', () => {
  const rolesSelector = makeSelectRoles();
  it('should select the roles', () => {
    const roles = fromJS([]);
    const mockedState = fromJS({
      main: {
        roles: {
          data: roles,
        },
      },
    });

    expect(rolesSelector(mockedState)).toEqual(roles);
  });
});

describe('makeSelectNormalizedRelations', () => {
  const relationsSelector = makeSelectNormalizedRelations();

  it('should return empty list if any of dependencies is not loaded', () => {
    const mockedState = fromJS({
      main: {
        users: { data: 'blah blah' },
        projects: { data: 'blah blah' },
        roles: { data: null }, // Not loaded yet
        relations: { data: 'blah blah' },
      },
    });

    const expected = fromJS([]);
    expect(relationsSelector(mockedState)).toEqual(expected);
  });

  it('should normalized the relations', () => {
    const projects = fromJS([
      { id: 1, name: 'Trip to space' },
      { id: 2, name: 'Assembly Ikea funiture' },
    ]);
    const roles = fromJS([{ id: 1, name: 'Admin' }, { id: 2, name: 'Editor' }]);
    const users = fromJS([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Alice' },
    ]);
    const relations = [
      { projectId: 1, roleId: 1, userId: 1 },
      { projectId: 2, roleId: 2, userId: 2 },
    ];

    const normalized = fromJS([
      [projects.get(0), roles.get(0), users.get(0)],
      [projects.get(0), roles.get(1), null],
      [projects.get(1), roles.get(0), null],
      [projects.get(1), roles.get(1), users.get(1)],
    ]);

    const mockedState = fromJS({
      main: {
        users: { data: users },
        projects: { data: projects },
        roles: { data: roles },
        relations: { data: relations },
      },
    });

    expect(relationsSelector(mockedState)).toEqual(normalized);
  });
});
