import { all } from 'redux-saga/effects';
import { watchFetchDestinations, watchFetchThemes } from './global';
import { watchFetchDestination } from './destination';
import { watchFetchHome } from './home';

export default function* rootSaga() {
  try {
    yield all([
      // Global data
      watchFetchDestinations(),
      watchFetchThemes(),

      // Destination and details
      watchFetchDestination(),

      // Home
      watchFetchHome(),
    ]);
  } catch (err) {
    // TODO: Handle error, maybe show on alert...
  }
}
