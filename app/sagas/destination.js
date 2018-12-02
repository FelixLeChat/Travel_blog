import { take, put, call } from 'redux-saga/effects';

import api from '../api';
import Cache from '../cache';
import {
  fetchDestinationDetailsStart,
  fetchDestinationDetailsSuccess,
  fetchDestinationDetailsFail,
} from '../reducers/destination';

// Query server for data
export function* fetchDestinationDetails({ params }) {
  const url = `/destination/${params.destination}`;
  const cacheKey = `${Cache.StoreKeys.DESTINATIONS}-${params.destination}`;
  try {
    if (Cache.exists(cacheKey)) {
      yield put(fetchDestinationDetailsSuccess(Cache.getItem(cacheKey)));
    } else {
      const { data } = yield call([api(), 'get'], url, {});
      yield put(fetchDestinationDetailsSuccess(data));
      Cache.setItem(cacheKey, data);
    }
  } catch (error) {
    yield put(fetchDestinationDetailsFail(error));
  }
}

export function* watchFetchDestination() {
  while (true) {
    const { payload } = yield take(fetchDestinationDetailsStart);
    yield call(fetchDestinationDetails, payload);
  }
}
