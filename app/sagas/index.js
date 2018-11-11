import { all } from 'redux-saga/effects';
import { watchFetchHome } from './home';

export default function* rootSaga() {
  try {
    yield all([watchFetchHome()]);
  } catch (err) {
    // TODO: Handle error, maybe show on alert...
  }
}
