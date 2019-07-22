import React, { Component } from 'react';
import api from '../../api';

import {
  Form,
  List,
  Row,
  Wrapper
} from './components';

export default class Main extends Component {
  state = {
    loansById: {},
    ...this.defaultInvestState(),
  };

  componentDidMount() {
    this.fetchLoans();
  }

  defaultInvestState() {
    return {
      invest: {
        loanId: null,
        isActive: false,
        amount: 0,
      }
    };
  }

  loanBtnClickHandler = id => this.updateActiveLoanId(id);
  investAmountFieldHandler = ({ target: { value } }) => this.updateInvestAmount(value);
  investBtnClickHandler = () => this.invest();
  closeBtnClickHandler = () => this.updateActiveLoanId();

  fetchLoans() {
    api
      .getLoans()
      .then(this.parseLoans.bind(this))
      .then(this.saveLoans.bind(this));
  }

  parseLoans(rawData) {
    return rawData.reduce((obj, {
      id,
      title,
      available,
    }) => {
      obj[id] = {
        id,
        title,
        wasInvestedIn: false,
        available: Number(available.replace(',', ''))
      };

      return obj;
    }, {});
  }

  saveLoans(loansById) {
    this.setState({
      loansById
    });
  }

  updateActiveLoanId(loanId = null) {
    this.setState(({ invest }) => ({
      invest: {
        ...invest,
        loanId,
        isActive: loanId !== null
      }
    }));
  }

  updateInvestAmount(value) {
    const amount = parseInt(value.replace('-', ''), 10) || 0;

    this.setState(({ invest }) => ({
      invest: {
        ...invest,
        amount
      }
    }));
  }

  invest() {
    const {
      invest: {
        loanId,
        amount
      },
      loansById
    } = this.state;

    const pasedAmount = parseInt(amount, 10);

    if (pasedAmount > 0) {
      const calculatedAmount = loansById[loanId].available - pasedAmount;

      this.setState(({ loansById }) => ({
        loansById: {
          ...loansById,
          [loanId]: {
            ...loansById[loanId],
            wasInvestedIn: true,
            available: calculatedAmount
          }
        },
        ...this.defaultInvestState(),
      }));

      this.updateActiveLoanId();
    }
  }

  render() {
    const {
      loansById,
      invest: {
        loanId,
        isActive,
        amount,
      }
    } = this.state;
    const loans = Object.values(loansById);

    const currentLoan = isActive ? loansById[loanId] : {};

    const totalAmount = loans.reduce((acc, { available }) => {
      return acc + available;
    }, 0);

    return (
      <Wrapper>
        <List>
          <Row header />
          {
            loans.map(loan => (
              <Row
                key={ loan.id }
                { ...loan }
                onLoanBtnClick={ () => this.loanBtnClickHandler(loan.id) }
              />
            ))
          }
          <Row total available={ totalAmount } />
        </List>
        <Form
          amount={ amount }
          isActive={ isActive }
          { ...currentLoan }
          onInvestAmountChange={ this.investAmountFieldHandler }
          onInvestBtnClick={ this.investBtnClickHandler }
          onCloseBtnClick={ this.closeBtnClickHandler }
        />
      </Wrapper>
    );
  }
}
