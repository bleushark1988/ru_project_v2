import { fromJS } from 'immutable';
import { ACTIONS } from './constants';

const COMMON_INHERIT = {
  loading: false,
  error: false,
};

// The initial state of the App
const initialState = fromJS({
  users: {
    ...COMMON_INHERIT,
    data: null,
  },
  projects: {
    ...COMMON_INHERIT,
    data: null,
  },
  roles: {
    ...COMMON_INHERIT,
    data: null,
  },
  relations: {
    ...COMMON_INHERIT,
    data: null,
  },
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_USERS:
      return state
        .setIn(['users', 'loading'], true)
        .setIn(['users', 'error'], false);
    case ACTIONS.LOAD_USERS_SUCCESS:
      return state
        .setIn(['users', 'loading'], false)
        .setIn(['users', 'error'], false)
        .setIn(['users', 'data'], action.payload);
    case ACTIONS.LOAD_USERS_ERROR:
      return state
        .setIn(['users', 'loading'], false)
        .setIn(['users', 'error'], action.payload);
    case ACTIONS.LOAD_PROJECTS:
      return state
        .setIn(['projects', 'loading'], true)
        .setIn(['projects', 'error'], false);
    case ACTIONS.LOAD_PROJECTS_SUCCESS:
      return state
        .setIn(['projects', 'loading'], false)
        .setIn(['projects', 'error'], false)
        .setIn(['projects', 'data'], action.payload);
    case ACTIONS.LOAD_PROJECTS_ERROR:
      return state
        .setIn(['projects', 'loading'], false)
        .setIn(['projects', 'error'], action.payload);
    case ACTIONS.LOAD_ROLES:
      return state
        .setIn(['roles', 'loading'], true)
        .setIn(['roles', 'error'], false);
    case ACTIONS.LOAD_ROLES_SUCCESS:
      return state
        .setIn(['roles', 'loading'], false)
        .setIn(['roles', 'error'], false)
        .setIn(['roles', 'data'], action.payload);
    case ACTIONS.LOAD_ROLES_ERROR:
      return state
        .setIn(['roles', 'loading'], false)
        .setIn(['roles', 'error'], action.payload);
    case ACTIONS.LOAD_RELATIONS:
      return state
        .setIn(['relations', 'loading'], true)
        .setIn(['relations', 'error'], false);
    case ACTIONS.LOAD_RELATIONS_SUCCESS:
      return state
        .setIn(['relations', 'loading'], false)
        .setIn(['relations', 'error'], false)
        .setIn(['relations', 'data'], action.payload);
    case ACTIONS.LOAD_RELATIONS_ERROR:
      return state
        .setIn(['relations', 'loading'], false)
        .setIn(['relations', 'error'], action.payload);
    default:
      return state;
  }
}
