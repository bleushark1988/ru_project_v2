import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectNormalizedRelations,
} from 'containers/MainPage/selectors';

import messages from './messages';

import Table from './Table';
import RelationRow from './RelationRow';
import Tr from './Tr';
import Th from './Th';

export function RelationsList({ loading, relations }) {
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Table>
      <thead>
        <Tr>
          <Th>
            <FormattedMessage {...messages.project} />
          </Th>
          <Th>
            <FormattedMessage {...messages.role} />
          </Th>
          <Th width="50%">
            <FormattedMessage {...messages.user} />
          </Th>
        </Tr>
      </thead>
      <tbody>
        {relations.map(relation => (
          <RelationRow
            key={`${relation.getIn([0, 'id'])}__${relation.getIn([
              1,
              'id',
            ])}__${relation.getIn([2, 'id'])}`}
            project={relation.get(0)}
            role={relation.get(1)}
            user={relation.get(2)}
          />
        ))}
      </tbody>
    </Table>
  );
}

RelationsList.propTypes = {
  loading: PropTypes.bool,
  relations: PropTypes.object,
};

RelationsList.displayName = 'RelationsList';

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  relations: makeSelectNormalizedRelations(),
});

export default connect(
  mapStateToProps,
  null,
)(RelationsList);
