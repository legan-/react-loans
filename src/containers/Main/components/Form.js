import React, { memo } from 'react';
import * as TYPES from 'prop-types';

Form.propTypes = {
  amount: TYPES.number.isRequired,
  title: TYPES.string,
  available: TYPES.number,
  isActive: TYPES.bool.isRequired,
  onInvestAmountChange: TYPES.func.isRequired,
  onInvestBtnClick: TYPES.func.isRequired,
  onCloseBtnClick: TYPES.func.isRequired,
};

Form.defaultProps = {
  title: '',
  available: 0,
};

const areEqual = (prevProps, nextProps) => {
  const {
    amount: amountA,
    title: titleA,
    available: availableA,
    isActive: isActiveA,
  } = prevProps;

  const {
    amount: amountB,
    title: titleB,
    available: availableB,
    isActive: isActiveB
  } = nextProps;

  return amountA === amountB && titleA === titleB && availableA === availableB && isActiveA === isActiveB;
};

function Form({
  amount,
  title,
  available,
  isActive,
  onInvestAmountChange,
  onInvestBtnClick,
  onCloseBtnClick,
}) {
  const keyPressHandler = e => {
    if (e.key === 'Enter') onInvestBtnClick();
  };

  return isActive && (
    <div className='form-wrapper'>
      <div className='form-background' onClick={ onCloseBtnClick } />
      <div className='form'>
        <h2>Invest</h2>
        <p>
          <b>Name: </b>
          { title }
        </p>
        <p>
          <b>Available: </b>
          { available }
        </p>
        <div className='form-input'>
          <label htmlFor='amount'>
            <b>Amount:</b>
          </label>
          <input
            id='amount'
            value={ amount }
            onKeyPress={ keyPressHandler }
            onChange={ onInvestAmountChange }
          />
        </div>
        <div className='buttons'>
          <button
            onClick={ onCloseBtnClick }
          >
            Cancel
          </button>
          <button
            className='primary'
            onClick={ onInvestBtnClick }
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Form, areEqual);
