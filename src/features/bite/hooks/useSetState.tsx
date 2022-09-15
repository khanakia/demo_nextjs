import { useReducer, Reducer } from 'react';

// const reducer = <T extends unknown>(prevState: Array<T>, updatedProperty: Array<T>) => ({
//   ...prevState,
//   ...updatedProperty,
// });

const reducer = (prevState: any, updatedProperty: any) => ({
  ...prevState,
  ...updatedProperty,
});

export default function useSetState<T>(defaultState: T) {
  return useReducer<Reducer<T, T>>(reducer, defaultState);
  // return defaultState
}

