import { take, put, call } from 'redux-saga/effects';

import api from '../api';
import Cache from '../cache';
import { fetchArticleStart, fetchArticleSuccess, fetchArticleFail } from '../reducers/article';

// Query server for data
export function* fetchArticleDetails({ data: { params } }) {
  const url = `/article/${params.article}`;
  const cacheKey = `${Cache.StoreKeys.ARTICLES}-${params.article}`;
  try {
    if (Cache.exists(cacheKey)) {
      yield put(fetchArticleSuccess(Cache.getItem(cacheKey)));
    } else {
      const { data } = yield call([api(), 'get'], url, {});
      yield put(fetchArticleSuccess(data));
      Cache.setItem(cacheKey, data);
    }
  } catch (error) {
    yield put(fetchArticleFail(error));
  }
}

export function* watchFetchArticle() {
  while (true) {
    const { payload } = yield take(fetchArticleStart);
    yield call(fetchArticleDetails, payload);
  }
}
