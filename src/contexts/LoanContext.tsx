import React, {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';

import {
  initialLoanState,
  loanReducer,
} from '../reducers/loanReducer';
import type {
  LoanAction,
  LoanState,
} from '../types/loan';

const LoanStateContext =
  createContext<LoanState | undefined>(undefined);

const LoanDispatchContext =
  createContext<Dispatch<LoanAction> | undefined>(undefined);

type LoanProviderProps = {
  children: ReactNode;
};

export function LoanProvider({ children }: LoanProviderProps) {
  const [state, dispatch] = useReducer(
    loanReducer,
    initialLoanState,
  );

  return (
    <LoanStateContext.Provider value={state}>
      <LoanDispatchContext.Provider value={dispatch}>
        {children}
      </LoanDispatchContext.Provider>
    </LoanStateContext.Provider>
  );
}

export function useLoanState(): LoanState {
  const context = useContext(LoanStateContext);

  if (context === undefined) {
    throw new Error(
      'useLoanState harus digunakan di dalam LoanProvider.',
    );
  }

  return context;
}

export function useLoanDispatch(): Dispatch<LoanAction> {
  const context = useContext(LoanDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useLoanDispatch harus digunakan di dalam LoanProvider.',
    );
  }

  return context;
}
