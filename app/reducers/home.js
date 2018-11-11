import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  error: null,
  data: { themes: [], destinations: [] },
  isLoading: false,
};

// Actions
export const { fetchHomeStart, fetchHomeSuccess, fetchHomeFail } = createActions({
  FETCH_HOME_START: data => ({ data }),
  FETCH_HOME_SUCCESS: homePayload => ({ homePayload }),
  FETCH_HOME_FAIL: error => ({ error }),
});

// Reducer
export const reducer = handleActions(
  {
    [fetchHomeStart]: state => ({ ...state, error: null, isLoading: true }),
    [fetchHomeSuccess]: (state, { payload: { homePayload } }) => ({
      error: null,
      isLoading: false,
      data: { ...state.data, ...homePayload },
    }),
    [fetchHomeFail]: (state, { payload: { error } }) => ({
      error,
      isLoading: false,
      data: { themes: [], destinations: [] },
    }),
  },
  defaultState,
);
