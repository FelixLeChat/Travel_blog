import { take, put, call } from 'redux-saga/effects';

import api from '../api';
import Cache from '../cache';
import { fetchHomeStart, fetchHomeSuccess, fetchHomeFail } from '../reducers/home';

// Query server for data
export function* fetchHome() {
  const url = '/home';
  try {
    if (Cache.exists(Cache.StoreKeys.HOME)) {
      yield put(fetchHomeSuccess(Cache.getItem(Cache.StoreKeys.HOME)));
    } else {
      const { data } = yield call([api(), 'get'], url, {});
      yield put(fetchHomeSuccess(data));
      Cache.setItem(Cache.StoreKeys.HOME, data);
    }
  } catch (error) {
    console.log(error);
    yield put(fetchHomeFail(error));
  }
}

export function* watchFetchHome() {
  while (true) {
    yield take(fetchHomeStart);
    yield call(fetchHome);
  }
}
