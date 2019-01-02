import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  error: null,
  data: {
    article: null,
    relatedArticles: null,
  },
  isLoading: false,
};

// Actions
export const { fetchArticleStart, fetchArticleSuccess, fetchArticleFail } = createActions({
  FETCH_ARTICLE_START: data => ({ data }),
  FETCH_ARTICLE_SUCCESS: articlePayload => ({ articlePayload }),
  FETCH_ARTICLE_FAIL: error => ({ error }),
});

// Reducer
export const reducer = handleActions(
  {
    [fetchArticleStart]: state => ({
      ...state,
      data: { article: null, relatedArticles: null },
      error: null,
      isLoading: true,
    }),
    [fetchArticleSuccess]: (state, { payload: { articlePayload } }) => ({
      error: null,
      isLoading: false,
      data: { ...state.data, ...articlePayload },
    }),
    [fetchArticleFail]: (state, { payload: { error } }) => ({
      error,
      isLoading: false,
      data: { article: null, relatedArticles: null },
    }),
  },
  defaultState,
);
