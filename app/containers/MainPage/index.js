import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

// import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Section from 'components/Section';
import RelationsList from 'containers/RelationsList';

import saga from './saga';
import { loadUsers, loadProjects, loadRoles, loadRelations } from './actions';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';

/* eslint-disable react/prefer-stateless-function */
export class MainPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadUsers();
    this.props.loadProjects();
    this.props.loadRoles();
    this.props.loadRelations();
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Main Page</title>
          <meta
            name="description"
            content="Shows the list of the projects and the related users and roles"
          />
        </Helmet>
        <Section>
          <h1>Projects</h1>
          <RelationsList />
        </Section>
      </article>
    );
  }
}

MainPage.propTypes = {
  loadUsers: PropTypes.func,
  loadProjects: PropTypes.func,
  loadRoles: PropTypes.func,
  loadRelations: PropTypes.func,
};

export const mapDispatchToProps = {
  loadUsers,
  loadProjects,
  loadRoles,
  loadRelations,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'main', saga });
export default compose(
  withSaga,
  withConnect,
)(MainPage);
