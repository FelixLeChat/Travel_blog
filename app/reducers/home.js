import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  error: null,
  data: {},
  isLoading: false,
};

// Actions
export const { fetchHomeStart, fetchHomeSuccess, fetchHomeFail } = createActions({});

// Reducer
export const reducer = handleActions({}, defaultState);
