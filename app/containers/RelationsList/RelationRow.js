import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { List, fromJS } from 'immutable';

import { makeSelectUsers } from 'containers/MainPage/selectors';
import { addRelation, removeRelation } from 'containers/MainPage/actions';

import Tr from './Tr';
import Td from './Td';
import UserSelector from './UserSelector';

export class RelationRow extends React.PureComponent {
  handleChangeUser = (selectedUser, { action }) => {
    if (action === 'select-option') {
      this.props.addRelation(
        fromJS({
          project: this.props.project,
          role: this.props.role,
          user: selectedUser,
        }),
      );
    } else {
      this.props.removeRelation(
        fromJS({
          project: this.props.project,
          role: this.props.role,
        }),
      );
    }
  };

  render() {
    const { project, role, user, userList, ...props } = this.props;

    return (
      <Tr {...props}>
        <Td>{project.get('name')}</Td>
        <Td>{role.get('name')}</Td>
        <Td>
          <UserSelector
            selected={user}
            userList={userList}
            onChange={this.handleChangeUser}
          />
        </Td>
      </Tr>
    );
  }
}

RelationRow.propTypes = {
  project: PropTypes.object,
  role: PropTypes.object,
  user: PropTypes.object,
  userList: PropTypes.instanceOf(List),
  addRelation: PropTypes.func,
  removeRelation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUsers(),
});

const mapDispatchToProps = { addRelation, removeRelation };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RelationRow);
