import { createAction } from '@reduxjs/toolkit';
// The old classic way!

/* 

type CounterState = { count: number };

type CounterAction =
  | { type: 'INCREMENT' | 'DECREMENT'; payload: number }
  | { type: 'RESET' };

export const reducer = (state: CounterState, action: CounterAction) => {
  if (action.type === 'INCREMENT') {
    return { count: state.count + action.payload };
  }

  if (action.type === 'DECREMENT') {
    return { count: state.count - action.payload };
  }

  if (action.type === 'RESET') {
    return { count: 0 };
  }

  return state;
};

*/

// it doesn't fully seem like this is all that much cleaner...
type CounterState = { count: number };

type CounterAction =
  | { type: 'INCREMENT' | 'DECREMENT'; payload: number }
  | { type: 'RESET' };

const increment = createAction('INCREMENT', (amount: number) => {
  return {
    payload: amount,
  };
});

const decrement = createAction('DECREMENT', (amount: number) => {
  return {
    payload: amount,
  };
});

const reset = createAction('RESET');

const incrementAction = increment(3);

export const reducer = (state: CounterState, action: CounterAction) => {
  // why is this a big deal
  // you've removed all of the constant for actions
  // no more action creator files
  if (action.type === increment.type) {
    return { count: state.count + action.payload };
  }

  if (action.type === decrement.type) {
    return { count: state.count - action.payload };
  }

  if (action.type === reset.type) {
    return { count: 0 };
  }

  return state;
};
