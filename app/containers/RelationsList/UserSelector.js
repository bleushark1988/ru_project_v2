import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Select from 'react-select';

export const UserSelector = ({ selected, userList, onChange }) => (
  <Select
    value={selected}
    onChange={onChange}
    options={userList}
    getOptionLabel={option => option.get('name')}
    getOptionValue={option => option.get('id')}
    isSearchable
    isClearable
    placeholder="Select user"
    noOptionsMessage={() => `No user`}
  />
);

UserSelector.propTypes = {
  selected: PropTypes.object,
  userList: PropTypes.instanceOf(List),
  onChange: PropTypes.func,
};

export default UserSelector;
