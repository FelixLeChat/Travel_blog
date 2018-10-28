import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  error: null,
  data: {
    currentRoute: null,
  },
  isLoading: false,
};

// Actions
export const {
  setCurrentRoute,
} = createActions({
  SET_CURRENT_ROUTE: currentRoute => ({ currentRoute }),
});

// Reducer
export const reducer = handleActions(
  {
    [setCurrentRoute]: (state, { payload: { currentRoute } }) => ({
      error: null,
      isLoading: false,
      data: {
        ...state.data,
        currentRoute,
      },
    }),
  },
  defaultState,
);
