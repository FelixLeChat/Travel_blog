import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  error: null,
  data: {
    id: null,
    destination: null,
    hero: null,
    articles: [],
  },
  isLoading: false,
};

// Actions
export const {
  fetchDestinationDetailsStart,
  fetchDestinationDetailsSuccess,
  fetchDestinationDetailsFail,
} = createActions({
  FETCH_DESTINATION_DETAILS_START: ({ params }) => ({ params }),
  FETCH_DESTINATION_DETAILS_SUCCESS: destinationPayload => ({ destinationPayload }),
  FETCH_DESTINATION_DETAILS_FAIL: error => ({ error }),
});

// Reducer
export const reducer = handleActions(
  {
    [fetchDestinationDetailsStart]: state => ({ ...state, error: null, isLoading: true }),
    [fetchDestinationDetailsSuccess]: (state, { payload: { destinationPayload } }) => ({
      error: null,
      isLoading: false,
      data: { ...state.data, ...destinationPayload },
    }),
    [fetchDestinationDetailsFail]: (state, { payload: { error } }) => ({
      error,
      isLoading: false,
      data: { destinations: null, hero: null },
    }),
  },
  defaultState,
);
