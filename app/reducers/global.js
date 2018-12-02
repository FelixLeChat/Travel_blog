import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  error: null,
  data: {
    currentRoute: null,
    themes: [],
    destinations: [],
  },
  isLoading: false,
};

// Actions
export const {
  setCurrentRoute,
  fetchDestinationsStart,
  fetchDestinationsSuccess,
  fetchDestinationsFail,
  fetchThemesStart,
  fetchThemesSuccess,
  fetchThemesFail,
} = createActions({
  SET_CURRENT_ROUTE: currentRoute => ({ currentRoute }),
  FETCH_DESTINATIONS_START: data => ({ data }),
  FETCH_DESTINATIONS_SUCCESS: destinationsPayload => ({ destinationsPayload }),
  FETCH_DESTINATIONS_FAIL: error => ({ error }),
  FETCH_THEMES_START: data => ({ data }),
  FETCH_THEMES_SUCCESS: themesPayload => ({ themesPayload }),
  FETCH_THEMES_FAIL: error => ({ error }),
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
    [fetchDestinationsStart]: state => ({ ...state, error: null, isLoading: true }),
    [fetchDestinationsSuccess]: (state, { payload: { destinationsPayload } }) => ({
      error: null,
      isLoading: false,
      data: { ...state.data, ...destinationsPayload },
    }),
    [fetchDestinationsFail]: (state, { payload: { error } }) => ({
      error,
      isLoading: false,
      data: { destinations: [] },
    }),
    [fetchThemesStart]: state => ({ ...state, error: null, isLoading: true }),
    [fetchThemesSuccess]: (state, { payload: { themesPayload } }) => ({
      error: null,
      isLoading: false,
      data: { ...state.data, ...themesPayload },
    }),
    [fetchThemesFail]: (state, { payload: { error } }) => ({
      error,
      isLoading: false,
      data: { themes: [] },
    }),
  },
  defaultState,
);
