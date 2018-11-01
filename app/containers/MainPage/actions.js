import { ACTIONS } from './constants';

export function loadUsers() {
  return {
    type: ACTIONS.LOAD_USERS,
  };
}

export function usersLoaded(users) {
  return {
    type: ACTIONS.LOAD_USERS_SUCCESS,
    payload: users,
  };
}

export function userLoadingError(error) {
  return {
    type: ACTIONS.LOAD_USERS_ERROR,
    payload: error,
  };
}

export function loadProjects() {
  return {
    type: ACTIONS.LOAD_PROJECTS,
  };
}

export function projectsLoaded(projects) {
  return {
    type: ACTIONS.LOAD_PROJECTS_SUCCESS,
    payload: projects,
  };
}

export function projectLoadingError(error) {
  return {
    type: ACTIONS.LOAD_PROJECTS_ERROR,
    payload: error,
  };
}

export function loadRoles() {
  return {
    type: ACTIONS.LOAD_ROLES,
  };
}

export function rolesLoaded(roles) {
  return {
    type: ACTIONS.LOAD_ROLES_SUCCESS,
    payload: roles,
  };
}

export function roleLoadingError(error) {
  return {
    type: ACTIONS.LOAD_ROLES_ERROR,
    payload: error,
  };
}

export function loadRelations() {
  return {
    type: ACTIONS.LOAD_RELATIONS,
  };
}

export function relationsLoaded(relations) {
  return {
    type: ACTIONS.LOAD_RELATIONS_SUCCESS,
    payload: relations,
  };
}

export function relationLoadingError(error) {
  return {
    type: ACTIONS.LOAD_RELATIONS_ERROR,
    payload: error,
  };
}

export function addRelation(newRelation) {
  return {
    type: ACTIONS.ADD_RELATION,
    payload: newRelation,
  };
}

export function removeRelation(existingRelation) {
  return {
    type: ACTIONS.REMOVE_RELATION,
    payload: existingRelation,
  };
}
