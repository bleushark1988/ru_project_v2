import { ACTIONS } from '../constants';

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
  addRelation,
  removeRelation,
  saveRelations,
} from '../actions';

describe('Main Actions', () => {
  describe('loadUsers', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: ACTIONS.LOAD_USERS,
      };

      expect(loadUsers()).toEqual(expectedResult);
    });
  });

  describe('usersLoaded', () => {
    it('should return the correct type and the passed users', () => {
      const users = ['Hey', 'John'];
      const expectedResult = {
        type: ACTIONS.LOAD_USERS_SUCCESS,
        payload: users,
      };

      expect(usersLoaded(users)).toEqual(expectedResult);
    });
  });

  describe('userLoadingError', () => {
    it('should return the correct type and the error', () => {
      const error = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: ACTIONS.LOAD_USERS_ERROR,
        payload: error,
      };

      expect(userLoadingError(error)).toEqual(expectedResult);
    });
  });

  describe('loadProjects', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: ACTIONS.LOAD_PROJECTS,
      };

      expect(loadProjects()).toEqual(expectedResult);
    });
  });

  describe('projectsLoaded', () => {
    it('should return the correct type and the passed projects', () => {
      const projects = ['One', 'Two'];
      const expectedResult = {
        type: ACTIONS.LOAD_PROJECTS_SUCCESS,
        payload: projects,
      };

      expect(projectsLoaded(projects)).toEqual(expectedResult);
    });
  });

  describe('projectLoadingError', () => {
    it('should return the correct type and the error', () => {
      const error = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: ACTIONS.LOAD_PROJECTS_ERROR,
        payload: error,
      };

      expect(projectLoadingError(error)).toEqual(expectedResult);
    });
  });

  describe('loadRoles', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: ACTIONS.LOAD_ROLES,
      };

      expect(loadRoles()).toEqual(expectedResult);
    });
  });

  describe('rolesLoaded', () => {
    it('should return the correct type and the passed roles', () => {
      const roles = ['Admin', 'Editor'];
      const expectedResult = {
        type: ACTIONS.LOAD_ROLES_SUCCESS,
        payload: roles,
      };

      expect(rolesLoaded(roles)).toEqual(expectedResult);
    });
  });

  describe('roleLoadingError', () => {
    it('should return the correct type and the error', () => {
      const error = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: ACTIONS.LOAD_ROLES_ERROR,
        payload: error,
      };

      expect(roleLoadingError(error)).toEqual(expectedResult);
    });
  });

  describe('loadRelations', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: ACTIONS.LOAD_RELATIONS,
      };

      expect(loadRelations()).toEqual(expectedResult);
    });
  });

  describe('relationsLoaded', () => {
    it('should return the correct type and the passed relations', () => {
      const relations = [1, 2, 3, 4, 5];
      const expectedResult = {
        type: ACTIONS.LOAD_RELATIONS_SUCCESS,
        payload: relations,
      };

      expect(relationsLoaded(relations)).toEqual(expectedResult);
    });
  });

  describe('relationLoadingError', () => {
    it('should return the correct type and the error', () => {
      const error = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: ACTIONS.LOAD_RELATIONS_ERROR,
        payload: error,
      };

      expect(relationLoadingError(error)).toEqual(expectedResult);
    });
  });

  describe('addRelation', () => {
    it('should return the correct type and the passed relation', () => {
      const newRelation = [1, 2, 3];
      const expectedResult = {
        type: ACTIONS.ADD_RELATION,
        payload: newRelation,
      };

      expect(addRelation(newRelation)).toEqual(expectedResult);
    });
  });

  describe('removeRelation', () => {
    it('should return the correct type and the target relation', () => {
      const relation = [1, 2, 3];
      const expectedResult = {
        type: ACTIONS.REMOVE_RELATION,
        payload: relation,
      };

      expect(removeRelation(relation)).toEqual(expectedResult);
    });
  });
});
