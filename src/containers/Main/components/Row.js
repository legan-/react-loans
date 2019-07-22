import React, { memo } from 'react';
import * as TYPES from 'prop-types';

Row.propTypes = {
  header: TYPES.bool,
  title: TYPES.string,
  available: TYPES.number,
  wasInvestedIn: TYPES.bool,
  onLoanBtnClick: TYPES.func,
  total: TYPES.bool,
};

Row.defaultProps = {
  header: false,
  title: '',
  available: 0,
  wasInvestedIn: false,
  onLoanBtnClick: () => {},
  total: false,
};

const areEqual = (prevProps, nextProps) => {
  const {
    header: headerA,
    title: titleA,
    available: availableA,
    wasInvestedIn: wasInvestedInA,
    total: totalA,
  } = prevProps;

  const {
    header: headerB,
    title: titleB,
    available: availableB,
    wasInvestedIn: wasInvestedInB,
    total: totalB,
  } = nextProps;

  return headerA === headerB && titleA === titleB && availableA === availableB && wasInvestedInA === wasInvestedInB && totalA === totalB;
};

function Row({
  header,
  title,
  available,
  wasInvestedIn,
  onLoanBtnClick,
  total,
}) {
  
  return header ? (
    <li className='header'>
      <span className='title'>Name</span>
      <span>Amount</span>
      <span>Invested</span>
    </li>
  ) : (
    <li>
      <span className='title'>{ total ? 'Total' : title }</span>
      <span>{ available }</span>
      {
        !total && <span>{ wasInvestedIn ? '+' : '' }</span>
      }
      {
        !total && (
          <span className='button'>
            <button
              className='primary'
              onClick={ onLoanBtnClick }
            >
              Invest
            </button>
          </span>
        )
      }
    </li>
  );
}

export default memo(Row, areEqual);
