/**
 * The relations state selectors
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

const selectMain = state => state.get('main');

// const selectRoute = state => state.get('route');

const makeSelectLoading = () =>
  createSelector(
    selectMain,
    s =>
      s.getIn(['projects', 'loading']) ||
      s.getIn(['users', 'loading']) ||
      s.getIn(['roles', 'loading']) ||
      s.getIn(['relations', 'loading']),
  );

const makeSelectError = () =>
  createSelector(selectMain, s =>
    [
      s.getIn(['projects', 'error']),
      s.getIn(['users', 'error']),
      s.getIn(['roles', 'error']),
      s.getIn(['relations', 'error']),
    ].filter(item => item),
  );

const makeSelectProjects = () =>
  createSelector(selectMain, s => s.getIn(['projects', 'data']));

const makeSelectUsers = () =>
  createSelector(selectMain, s => s.getIn(['users', 'data']));

const makeSelectRoles = () =>
  createSelector(selectMain, s => s.getIn(['roles', 'data']));

const makeSelectRelations = () =>
  createSelector(selectMain, s => s.getIn(['relations', 'data']));

/* eslint-disable prettier/prettier */
const makeSelectNormalizedRelations = () => createSelector(
  makeSelectProjects(),
  makeSelectRoles(),
  makeSelectUsers(),
  makeSelectRelations(),
  (projects, roles, users, relations) => {
    if (!projects || !roles || !users || !relations) {
      return fromJS([]);
    }

    const normalized = [];
    const findRelation = (projectId, roleId) =>
      relations.find(r => r.get('projectId') === projectId && r.get('roleId') === roleId);

    projects.forEach(project => {
      roles.forEach(role => {
        const relation = findRelation(project.get('id'), role.get('id'));
        const user = relation ? users.find(u => u.get('id') === relation.get('userId')) : null;

        normalized.push([project, role, user])
      });
    });

    return fromJS(normalized);
  },
);

export {
  selectMain,
  makeSelectLoading,
  makeSelectError,
  makeSelectProjects,
  makeSelectRoles,
  makeSelectUsers,
  makeSelectRelations,
  makeSelectNormalizedRelations,
  // makeSelectError,
  // makeSelectRepos,
  // makeSelectLocation,
};
