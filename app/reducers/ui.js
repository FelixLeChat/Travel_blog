import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  error: null,
  data: {
    isMobileMenuOpened: false,
  },
  isLoading: false,
};

// Actions
export const { setMobileMenuOpenedState } = createActions({
  SET_MOBILE_MENU_OPENED_STATE: isMobileMenuOpened => ({ isMobileMenuOpened }),
});

// Reducer
export const reducer = handleActions(
  {
    [setMobileMenuOpenedState]: (state, { payload: { isMobileMenuOpened } }) => ({
      error: null,
      isLoading: false,
      data: {
        ...state.data,
        isMobileMenuOpened,
      },
    }),
  },
  defaultState,
);
