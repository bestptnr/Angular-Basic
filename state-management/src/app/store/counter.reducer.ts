import { createReducer, on } from '@ngrx/store';
import { decrement, increment, set } from './counter.actions';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (currentState, action) => currentState + action.value),
  on(decrement, (currentState, action) => currentState - action.value),
  on(set, (curretState, action) => action.value)
);
