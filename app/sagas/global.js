import { take, put, call } from 'redux-saga/effects';

import api from '../api';
import Cache from '../cache';
import {
  fetchDestinationsStart,
  fetchDestinationsSuccess,
  fetchDestinationsFail,
} from '../reducers/global';

// Query server for data
export function* fetchDestinations() {
  const url = '/destinations';
  try {
    if (Cache.exists(Cache.StoreKeys.DESTINATIONS)) {
      yield put(fetchDestinationsSuccess(Cache.getItem(Cache.StoreKeys.DESTINATIONS)));
    } else {
      const { data } = yield call([api(), 'get'], url, {});
      yield put(fetchDestinationsSuccess(data));
      Cache.setItem(Cache.StoreKeys.DESTINATIONS, data);
    }
  } catch (error) {
    yield put(fetchDestinationsFail(error));
  }
}

export function* watchFetchGlobal() {
  while (true) {
    yield take(fetchDestinationsStart);
    yield call(fetchDestinations);
  }
}
