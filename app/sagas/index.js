import { all } from 'redux-saga/effects';
import { watchFetchGlobal } from './global';
import { watchFetchDestination } from './destination';

export default function* rootSaga() {
  try {
    yield all([watchFetchGlobal(), watchFetchDestination()]);
  } catch (err) {
    // TODO: Handle error, maybe show on alert...
  }
}
