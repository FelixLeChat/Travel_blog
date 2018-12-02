import { take, put, call } from 'redux-saga/effects';

import api from '../api';
import Cache from '../cache';
import { fetchHomeStart, fetchHomeSuccess, fetchHomeFail } from '../reducers/home';

// Query server for data
export function* fetchHomeDetails() {
  const url = '/home';
  const cacheKey = `${Cache.StoreKeys.HOME}`;
  try {
    if (Cache.exists(cacheKey)) {
      yield put(fetchHomeSuccess(Cache.getItem(cacheKey)));
    } else {
      const { data } = yield call([api(), 'get'], url, {});
      yield put(fetchHomeSuccess(data));
      Cache.setItem(cacheKey, data);
    }
  } catch (error) {
    yield put(fetchHomeFail(error));
  }
}

export function* watchFetchHome() {
  while (true) {
    yield take(fetchHomeStart);
    yield call(fetchHomeDetails);
  }
}
