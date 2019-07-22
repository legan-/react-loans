import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';

import Main from './index';
import {
  Form,
  List,
  Row,
  Wrapper,
} from './components';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => mount(<Main />);

describe('Main', () => {
  let component;
  let instance;
  const defaultState = {
    loansById: {},
    invest: {
      loanId: null,
      isActive: false,
      amount: 0,
    }
  };

  beforeEach(() => {
    component = setup();
    instance = component.instance();
  });

  afterEach(() => {
    component.unmount();
  });

  describe('layout', () => {
    describe('"Wrapper" component', () => {
      it('should be displayed', () => {
        expect(component.find(Wrapper)).toHaveLength(1);
      });

      it('should contain "List" component', () => {
        expect(component.find(List)).toHaveLength(1);
      });

      it('should contain "Form" component', () => {
        expect(component.find(Form)).toHaveLength(1);
      });

      it('should contain several "Row" components', () => {
        const initialState = {
          loansById: {
            3: {
              id: 3,
              title: 'Title 1',
              wasInvestedIn: false,
              available: 32111,
            }
          },
          invest: {
            loanId: null,
            isActive: false,
            amount: 0,
          }
        };

        instance.setState({ ...initialState });
        component.update();
        expect(component.find(Row)).toHaveLength(3);
      });

      it('should display total amount of loans', () => {
        const initialState = {
          loansById: {
            1: {
              id: 1,
              title: 'Title 1',
              wasInvestedIn: false,
              available: 579,
            },
            3: {
              id: 3,
              title: 'Title3',
              wasInvestedIn: false,
              available: 321,
            }
          },
          invest: {
            loanId: null,
            isActive: false,
            amount: 0,
          }
        };

        const expectedValue = '900';

        instance.setState({ ...initialState });
        component.update();

        expect(component.find(Row).last().find('span').last().text()).toBe(expectedValue);
      });
    });
  });

  describe('methods', () => {
    describe('parseLoans()', () => {
      it('should parse raw data', () => {
        const data = [
          {
            id: 0,
            title: 'Title 1',
            available: '11,234',
          },
          {
            id: 2,
            title: 'Title 2',
            available: '32,111',
          }
        ];

        const expectedOutput = {
          0: {
            id: 0,
            title: 'Title 1',
            wasInvestedIn: false,
            available: 11234,
          },
          2: {
            id: 2,
            title: 'Title 2',
            wasInvestedIn: false,
            available: 32111,
          }
        };

        expect(instance.parseLoans(data)).toEqual(expectedOutput);
      });
    });

    describe('saveLoans()', () => {
      it('should save loans data to the state', () => {
        const data = {
          0: {
            id: 0,
            title: 'Title 1',
            wasInvestedIn: false,
            available: 11234,
          }
        };

        const expectedState = {
          loansById: {
            ...data
          },
          invest: {
            loanId: null,
            isActive: false,
            amount: 0,
          }
        };

        instance.saveLoans(data);

        expect(instance.state).toEqual(expectedState);
      });
    });

    describe('updateActiveLoanId()', () => {
      it('should add an active loan id to the state', () => {
        const activeLoanId = 3;

        const expectedState = {
          loansById: {},
          invest: {
            loanId: 3,
            isActive: true,
            amount: 0,
          }
        };

        instance.updateActiveLoanId(activeLoanId);

        expect(instance.state).toEqual(expectedState);
      });

      it('should reset the active id', () => {

        const initialState = {
          loansById: {},
          invest: {
            loanId: 3,
            isActive: true,
            amount: 0,
          }
        };

        instance.setState({ ...initialState });
        expect(instance.state).toEqual(initialState);

        instance.updateActiveLoanId();
        expect(instance.state).toEqual(defaultState);
      });
    });

    describe('updateInvestAmount()', () => {
      it('should parse a non-numerical value as 0 and add a result to the store', () => {
        const value = 'abc';

        instance.updateInvestAmount(value);
        expect(instance.state).toEqual(defaultState);    
      });

      it('should parse a stringified negative value as positive and add a result to the store', () => {
        const value = '-23';

        const expectedState = {
          loansById: {},
          invest: {
            loanId: null,
            isActive: false,
            amount: 23,
          }
        };

        instance.updateInvestAmount(value);
        expect(instance.state).toEqual(expectedState);    
      });

      it('should parse a stringified value and add a result to the store', () => {
        const value = '123';

        const expectedState = {
          loansById: {},
          invest: {
            loanId: null,
            isActive: false,
            amount: 123,
          }
        };

        instance.updateInvestAmount(value);
        expect(instance.state).toEqual(expectedState);    
      });
    });

    describe('invest()', () => {
      it('should decrease available amount of loan', () => {
        const initialState = {
          loansById: {
            3: {
              id: 3,
              title: 'Title 1',
              wasInvestedIn: false,
              available: 1199,
            }
          },
          invest: {
            loanId: 3,
            isActive: true,
            amount: 99,
          }
        };

        const expectedState = {
          loansById: {
            3: {
              id: 3,
              title: 'Title 1',
              wasInvestedIn: true,
              available: 1100,
            }
          },
          invest: {
            loanId: null,
            isActive: false,
            amount: 0,
          }
        };

        instance.setState({ ...initialState });
        instance.invest();
        expect(instance.state).toEqual(expectedState);
      });
    });
  });
});
