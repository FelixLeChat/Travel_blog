import { take, put, call } from 'redux-saga/effects';

import api from '../api';
import Cache from '../cache';
import {
  fetchDestinationsStart,
  fetchDestinationsSuccess,
  fetchDestinationsFail,
  fetchThemesStart,
  fetchThemesSuccess,
  fetchThemesFail,
  fetchGalleryStart,
  fetchGallerySuccess,
  fetchGalleryFail,
} from '../reducers/global';

// Query server for data
export function* fetchDestinations() {
  const url = '/destinations';
  const cacheKey = Cache.StoreKeys.THEMES;

  try {
    if (Cache.exists(cacheKey)) {
      yield put(fetchDestinationsSuccess(Cache.getItem(cacheKey)));
    } else {
      const { data } = yield call([api(), 'get'], url, {});
      yield put(fetchDestinationsSuccess(data));
      Cache.setItem(cacheKey, data);
    }
  } catch (error) {
    yield put(fetchDestinationsFail(error));
  }
}

export function* fetchThemes() {
  const url = '/themes';
  const cacheKey = Cache.StoreKeys.THEMES;
  try {
    if (Cache.exists(cacheKey)) {
      yield put(fetchThemesSuccess(Cache.getItem(cacheKey)));
    } else {
      const { data } = yield call([api(), 'get'], url, {});
      yield put(fetchThemesSuccess(data));
      Cache.setItem(cacheKey, data);
    }
  } catch (error) {
    yield put(fetchThemesFail(error));
  }
}

export function* fetchGallery() {
  const url = '/gallery';
  const cacheKey = Cache.StoreKeys.GALLERY;
  try {
    if (Cache.exists(cacheKey)) {
      yield put(fetchGallerySuccess(Cache.getItem(cacheKey)));
    } else {
      const { data } = yield call([api(), 'get'], url, {});
      yield put(fetchGallerySuccess(data));
      Cache.setItem(cacheKey, data);
    }
  } catch (error) {
    yield put(fetchGalleryFail(error));
  }
}

export function* watchFetchDestinations() {
  while (true) {
    yield take(fetchDestinationsStart);
    yield call(fetchDestinations);
  }
}

export function* watchFetchThemes() {
  while (true) {
    yield take(fetchThemesStart);
    yield call(fetchThemes);
  }
}

export function* watchFetchGallery() {
  while (true) {
    yield take(fetchGalleryStart);
    yield call(fetchGallery);
  }
}
