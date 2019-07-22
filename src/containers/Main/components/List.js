import React, { memo } from 'react';
import * as TYPES from 'prop-types';

List.propTypes = {
  children: TYPES.node.isRequired,
};

function List({
  children
}) {
  return (
    <ul>
      { children }
    </ul>
  );
}

export default memo(List);
