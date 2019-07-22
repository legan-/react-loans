import React, { memo } from 'react';
import * as TYPES from 'prop-types';

Wrapper.propTypes = {
  children: TYPES.node.isRequired
};

function Wrapper({
  children
}) {
  return (
    <div className='wrapper'>
      { children } 
    </div>
  );
}

export default memo(Wrapper);
