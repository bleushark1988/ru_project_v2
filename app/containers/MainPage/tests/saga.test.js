/**
 * Tests for MainPage sagas
 */

import { put, call, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { ACTIONS } from '../constants';
import {
  usersLoaded,
  userLoadingError,
  projectsLoaded,
  projectLoadingError,
  rolesLoaded,
  roleLoadingError,
  relationsLoaded,
  relationLoadingError,
} from '../actions';

import mainRoot, {
  getUsers,
  getProjects,
  getRoles,
  getRelations,
  saveRelations,
  addRelation,
  removeRelation,
} from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('getUsers Saga', () => {
  let getUsersGenerator;

  beforeEach(() => {
    getUsersGenerator = getUsers();

    const callDescriptor = getUsersGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the usersLoaded action if it requests the data successfully', () => {
    const response = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    const putDescriptor = getUsersGenerator.next(response).value;

    expect(putDescriptor).toEqual(put(usersLoaded(fromJS(response))));
  });

  it('should call the userLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getUsersGenerator.throw(response).value;

    expect(putDescriptor).toEqual(put(userLoadingError(response)));
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('getProjects Saga', () => {
  let getProjectsGenerator;

  beforeEach(() => {
    getProjectsGenerator = getProjects();

    const callDescriptor = getProjectsGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the projectsLoaded action if it requests the data successfully', () => {
    const response = [
      { id: 1, name: 'Blah' },
      { id: 2, name: 'Nuke the test' },
    ];
    const putDescriptor = getProjectsGenerator.next(response).value;

    expect(putDescriptor).toEqual(put(projectsLoaded(fromJS(response))));
  });

  it('should call the projectLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getProjectsGenerator.throw(response).value;

    expect(putDescriptor).toEqual(put(projectLoadingError(response)));
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('getRoles Saga', () => {
  let getRolesGenerator;

  beforeEach(() => {
    getRolesGenerator = getRoles();

    const callDescriptor = getRolesGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the rolesLoaded action if it requests the data successfully', () => {
    const response = [{ id: 1, name: 'Admin' }, { id: 2, name: 'Editor' }];
    const putDescriptor = getRolesGenerator.next(response).value;

    expect(putDescriptor).toEqual(put(rolesLoaded(fromJS(response))));
  });

  it('should call the roleLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getRolesGenerator.throw(response).value;

    expect(putDescriptor).toEqual(put(roleLoadingError(response)));
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('getRelations Saga', () => {
  let getRelationsGenerator;

  beforeEach(() => {
    getRelationsGenerator = getRelations();

    const callDescriptor = getRelationsGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the relationsLoaded action if it requests the data successfully', () => {
    const response = [1, 2, 3, 4, 5, 6];
    const putDescriptor = getRelationsGenerator.next(response).value;

    expect(putDescriptor).toEqual(put(relationsLoaded(fromJS(response))));
  });

  it('should call the relationLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getRelationsGenerator.throw(response).value;

    expect(putDescriptor).toEqual(put(relationLoadingError(response)));
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('saveRelations Saga', () => {
  let saveRelationsGenerator;
  const relations = fromJS([
    { projectId: 1, userId: 1, roleId: 1 },
    { projectId: 1, userId: 2, roleId: 2 },
  ]);

  beforeEach(() => {
    saveRelationsGenerator = saveRelations(relations);

    const callDescriptor = saveRelationsGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the relationsLoaded action if it posts the data successfully', () => {
    const putDescriptor = saveRelationsGenerator.next().value;

    expect(putDescriptor).toEqual(put(relationsLoaded(relations)));
  });

  it('should call the relationLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = saveRelationsGenerator.throw(response).value;

    expect(putDescriptor).toEqual(put(relationLoadingError(response)));
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('addRelation Saga', () => {
  const existingRelations = fromJS([{ projectId: 1, roleId: 1, userId: 1 }]);

  const getAddRelationsGenerator = newRelation => {
    const addRelationsGenerator = addRelation({ payload: newRelation });

    const selectDescriptor = addRelationsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    return addRelationsGenerator;
  };

  it('should call saveRelations saga with new relations list', () => {
    const addRelationsGenerator = getAddRelationsGenerator(
      fromJS({
        project: { id: 1, name: 'Climb' },
        role: { id: 2, name: 'Leader' },
        user: { id: 2, name: 'John' },
      }),
    );

    const updatedRelations = existingRelations.push(
      fromJS({
        projectId: 1,
        roleId: 2,
        userId: 2,
      }),
    );
    const putDescriptor = addRelationsGenerator.next(existingRelations).value;

    expect(putDescriptor).toEqual(call(saveRelations, updatedRelations));
  });

  it('should replace the relation which has same project, same user', () => {
    const addRelationsGenerator = getAddRelationsGenerator(
      fromJS({
        project: { id: 1, name: 'Climb' },
        role: { id: 2, name: 'Leader' },
        user: { id: 1, name: 'John' },
      }),
    );

    const updatedRelations = existingRelations.clear().push(
      fromJS({
        projectId: 1,
        roleId: 2,
        userId: 1,
      }),
    );
    const putDescriptor = addRelationsGenerator.next(existingRelations).value;

    expect(putDescriptor).toEqual(call(saveRelations, updatedRelations));
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('removeRelation Saga', () => {
  let removeRelationsGenerator;
  const existingRelations = fromJS([
    { projectId: 1, roleId: 1, userId: 1 },
    { projectId: 1, roleId: 2, userId: 2 },
  ]);
  const targetRelation = fromJS({
    project: { id: 1, name: 'Climb' },
    role: { id: 1, name: 'Leader' },
    user: { id: 1, name: 'John' },
  });

  beforeEach(() => {
    removeRelationsGenerator = removeRelation({ payload: targetRelation });

    const selectDescriptor = removeRelationsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should call saveRelations saga with relations list after target relation is gone', () => {
    const updatedRelations = existingRelations.splice(0, 1);
    const putDescriptor = removeRelationsGenerator.next(updatedRelations).value;

    expect(putDescriptor).toEqual(call(saveRelations, updatedRelations));
  });
});

describe('mainRoot Saga', () => {
  const mainRootSaga = mainRoot();

  it('should start task to watch for async actions', () => {
    const getUsersDescriptor = mainRootSaga.next().value;
    const getProjectsDescriptor = mainRootSaga.next().value;
    const getRolesDescriptor = mainRootSaga.next().value;
    const getRelationsDescriptor = mainRootSaga.next().value;
    const addRelationDescriptor = mainRootSaga.next().value;
    const removeRelationDescriptor = mainRootSaga.next().value;

    expect(getUsersDescriptor).toEqual(
      takeLatest(ACTIONS.LOAD_USERS, getUsers),
    );

    expect(getProjectsDescriptor).toEqual(
      takeLatest(ACTIONS.LOAD_PROJECTS, getProjects),
    );

    expect(getRolesDescriptor).toEqual(
      takeLatest(ACTIONS.LOAD_ROLES, getRoles),
    );

    expect(getRelationsDescriptor).toEqual(
      takeLatest(ACTIONS.LOAD_RELATIONS, getRelations),
    );

    expect(addRelationDescriptor).toEqual(
      takeLatest(ACTIONS.ADD_RELATION, addRelation),
    );

    expect(removeRelationDescriptor).toEqual(
      takeLatest(ACTIONS.REMOVE_RELATION, removeRelation),
    );
  });
});
