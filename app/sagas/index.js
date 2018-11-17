import { all } from 'redux-saga/effects';
import { watchFetchGlobal } from './global';

export default function* rootSaga() {
  try {
    yield all([watchFetchGlobal()]);
  } catch (err) {
    // TODO: Handle error, maybe show on alert...
  }
}
