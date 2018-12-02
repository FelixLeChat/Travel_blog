import { all } from 'redux-saga/effects';
import { watchFetchDestinations, watchFetchThemes } from './global';
import { watchFetchDestination } from './destination';

export default function* rootSaga() {
  try {
    yield all([watchFetchDestinations(), watchFetchThemes(), watchFetchDestination()]);
  } catch (err) {
    // TODO: Handle error, maybe show on alert...
  }
}
