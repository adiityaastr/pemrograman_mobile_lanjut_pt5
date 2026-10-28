export type LoanFilter =
  | 'all'
  | 'borrowed'
  | 'returned';

export interface Loan {
  id: string;
  borrowerName: string;
  bookTitle: string;
  borrowDate: string; // format YYYY-MM-DD
  returned: boolean;
  createdAt: number;
}

export interface LoanState {
  loans: Loan[];
  filter: LoanFilter;
}

export type LoanAction =
  | {
      type: 'loan/add';
      payload: Loan;
    }
  | {
      type: 'loan/toggleReturned';
      payload: { id: string };
    }
  | {
      type: 'loan/delete';
      payload: { id: string };
    }
  | {
      type: 'filter/set';
      payload: { filter: LoanFilter };
    };
