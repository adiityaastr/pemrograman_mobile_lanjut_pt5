import type {
  LoanAction,
  LoanState,
} from '../types/loan';
import { todayString } from '../utils/date';

export const initialLoanState: LoanState = {
  loans: [
    {
      id: 'sample-1',
      borrowerName: 'Andi Pratama',
      bookTitle: 'Laskar Pelangi',
      borrowDate: todayString(-5),
      returned: false,
      createdAt: Date.now(),
    },
    {
      id: 'sample-2',
      borrowerName: 'Siti Rahma',
      bookTitle: 'Clean Code',
      borrowDate: todayString(-12),
      returned: true,
      createdAt: Date.now() - 1000,
    },
    {
      id: 'sample-3',
      borrowerName: 'Budi Santoso',
      bookTitle: 'Bumi Manusia',
      borrowDate: todayString(-2),
      returned: false,
      createdAt: Date.now() - 2000,
    },
  ],
  filter: 'all',
};

export function loanReducer(
  state: LoanState,
  action: LoanAction,
): LoanState {
  switch (action.type) {
    case 'loan/add':
      return {
        ...state,
        loans: [
          action.payload,
          ...state.loans,
        ],
      };

    case 'loan/toggleReturned':
      return {
        ...state,
        loans: state.loans.map(loan =>
          loan.id === action.payload.id
            ? {
                ...loan,
                returned: !loan.returned,
              }
            : loan,
        ),
      };

    case 'loan/delete':
      return {
        ...state,
        loans: state.loans.filter(
          loan => loan.id !== action.payload.id,
        ),
      };

    case 'filter/set':
      return {
        ...state,
        filter: action.payload.filter,
      };

    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
}
