import { fromJS } from 'immutable';

import mainReducer from '../reducer';
import {
  loadUsers,
  usersLoaded,
  userLoadingError,
  loadProjects,
  projectsLoaded,
  projectLoadingError,
  loadRoles,
  rolesLoaded,
  roleLoadingError,
  loadRelations,
  relationsLoaded,
  relationLoadingError,
} from '../actions';

describe('mainReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      users: {
        loading: false,
        error: false,
        data: null,
      },
      projects: {
        loading: false,
        error: false,
        data: null,
      },
      roles: {
        loading: false,
        error: false,
        data: null,
      },
      relations: {
        loading: false,
        error: false,
        data: null,
      },
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(mainReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadUsers action correctly', () => {
    const expectedResult = state
      .setIn(['users', 'loading'], true)
      .setIn(['users', 'error'], false);

    expect(mainReducer(state, loadUsers())).toEqual(expectedResult);
  });

  it('should handle the usersLoaded action correctly', () => {
    const userList = ['john', 'sam'];
    const expectedResult = state
      .setIn(['users', 'loading'], false)
      .setIn(['users', 'error'], false)
      .setIn(['users', 'data'], userList);

    expect(mainReducer(state, usersLoaded(userList))).toEqual(expectedResult);
  });

  it('should handle the userLoadingError action correctly', () => {
    const error = '404';
    const expectedResult = state
      .setIn(['users', 'loading'], false)
      .setIn(['users', 'error'], error);

    expect(mainReducer(state, userLoadingError(error))).toEqual(expectedResult);
  });

  it('should handle the loadProjects action correctly', () => {
    const expectedResult = state
      .setIn(['projects', 'loading'], true)
      .setIn(['projects', 'error'], false);

    expect(mainReducer(state, loadProjects())).toEqual(expectedResult);
  });

  it('should handle the projectsLoaded action correctly', () => {
    const projectList = ['kick', 'attack'];
    const expectedResult = state
      .setIn(['projects', 'loading'], false)
      .setIn(['projects', 'error'], false)
      .setIn(['projects', 'data'], projectList);

    expect(mainReducer(state, projectsLoaded(projectList))).toEqual(
      expectedResult,
    );
  });

  it('should handle the projectLoadingError action correctly', () => {
    const error = '404';
    const expectedResult = state
      .setIn(['projects', 'loading'], false)
      .setIn(['projects', 'error'], error);

    expect(mainReducer(state, projectLoadingError(error))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loadRoles action correctly', () => {
    const expectedResult = state
      .setIn(['roles', 'loading'], true)
      .setIn(['roles', 'error'], false);

    expect(mainReducer(state, loadRoles())).toEqual(expectedResult);
  });

  it('should handle the rolesLoaded action correctly', () => {
    const roleList = ['admin', 'worker'];
    const expectedResult = state
      .setIn(['roles', 'loading'], false)
      .setIn(['roles', 'error'], false)
      .setIn(['roles', 'data'], roleList);

    expect(mainReducer(state, rolesLoaded(roleList))).toEqual(expectedResult);
  });

  it('should handle the roleLoadingError action correctly', () => {
    const error = '404';
    const expectedResult = state
      .setIn(['roles', 'loading'], false)
      .setIn(['roles', 'error'], error);

    expect(mainReducer(state, roleLoadingError(error))).toEqual(expectedResult);
  });

  it('should handle the loadRelations action correctly', () => {
    const expectedResult = state
      .setIn(['relations', 'loading'], true)
      .setIn(['relations', 'error'], false);

    expect(mainReducer(state, loadRelations())).toEqual(expectedResult);
  });

  it('should handle the relationsLoaded action correctly', () => {
    const relationList = ['one', 'two'];
    const expectedResult = state
      .setIn(['relations', 'loading'], false)
      .setIn(['relations', 'error'], false)
      .setIn(['relations', 'data'], relationList);

    expect(mainReducer(state, relationsLoaded(relationList))).toEqual(
      expectedResult,
    );
  });

  it('should handle the relationLoadingError action correctly', () => {
    const error = '404';
    const expectedResult = state
      .setIn(['relations', 'loading'], false)
      .setIn(['relations', 'error'], error);

    expect(mainReducer(state, relationLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
