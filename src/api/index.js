import { loans } from './current-loans.json';

const getLoans = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(loans);
  }, 300);
});

export default {
  getLoans
};
