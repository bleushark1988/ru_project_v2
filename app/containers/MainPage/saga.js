/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { makeSelectRelations } from 'containers/MainPage/selectors';
import request from 'utils/request';

import { ACTIONS } from './constants';
import {
  usersLoaded,
  userLoadingError,
  projectsLoaded,
  projectLoadingError,
  rolesLoaded,
  roleLoadingError,
  relationsLoaded,
  relationLoadingError,
} from './actions';

/**
 * Load users request/response handler
 */
export function* getUsers() {
  const requestURL = `/api/users`;

  try {
    // Call our request helper (see 'utils/request')
    const users = yield call(request, requestURL);
    yield put(usersLoaded(fromJS(users)));
  } catch (err) {
    yield put(userLoadingError(err));
  }
}

/**
 * Load projects request/response handler
 */
export function* getProjects() {
  const requestURL = `/api/projects`;

  try {
    // Call our request helper (see 'utils/request')
    const projects = yield call(request, requestURL);
    yield put(projectsLoaded(fromJS(projects)));
  } catch (err) {
    yield put(projectLoadingError(err));
  }
}

/**
 * Load roles request/response handler
 */
export function* getRoles() {
  const requestURL = `/api/roles`;

  try {
    // Call our request helper (see 'utils/request')
    const roles = yield call(request, requestURL);
    yield put(rolesLoaded(fromJS(roles)));
  } catch (err) {
    yield put(roleLoadingError(err));
  }
}

/**
 * Load relations request/response handler
 */
export function* getRelations() {
  const requestURL = `/api/relations`;

  try {
    // Call our request helper (see 'utils/request')
    const relations = yield call(request, requestURL);
    yield put(relationsLoaded(fromJS(relations)));
  } catch (err) {
    yield put(relationLoadingError(err));
  }
}

/**
 * Save relations request/response handler
 */
export function* saveRelations(relations) {
  const requestURL = `/api/relations`;
  const options = {
    method: 'POST',
    body: JSON.stringify(relations.toJS()),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    yield call(request, requestURL, options);
    yield put(relationsLoaded(relations));
  } catch (err) {
    yield put(relationLoadingError(err));
  }
}

/**
 * Add new relation handler
 *
 */
export function* addRelation({ payload }) {
  // Select normalized relations from store
  const relations = yield select(makeSelectRelations());
  const newRelation = fromJS({
    projectId: payload.getIn(['project', 'id']),
    roleId: payload.getIn(['role', 'id']),
    userId: payload.getIn(['user', 'id']),
  });

  const updateRelations = relations
    .filter(
      r =>
        !(
          r.get('projectId') === newRelation.get('projectId') &&
          r.get('userId') === newRelation.get('userId')
        ),
    )
    .push(newRelation);

  yield call(saveRelations, updateRelations);
}

/**
 * Remove new relation handler
 *
 */
export function* removeRelation({ payload }) {
  // Select normalized relations from store
  const relations = yield select(makeSelectRelations());
  const newRelation = fromJS({
    projectId: payload.getIn(['project', 'id']),
    roleId: payload.getIn(['role', 'id']),
  });

  const updateRelations = relations.filter(
    r =>
      !(
        r.get('projectId') === newRelation.get('projectId') &&
        r.get('roleId') === newRelation.get('roleId')
      ),
  );

  yield call(saveRelations, updateRelations);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* mainRoot() {
  yield takeLatest(ACTIONS.LOAD_USERS, getUsers);
  yield takeLatest(ACTIONS.LOAD_PROJECTS, getProjects);
  yield takeLatest(ACTIONS.LOAD_ROLES, getRoles);
  yield takeLatest(ACTIONS.LOAD_RELATIONS, getRelations);
  yield takeLatest(ACTIONS.ADD_RELATION, addRelation);
  yield takeLatest(ACTIONS.REMOVE_RELATION, removeRelation);
}
