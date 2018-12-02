import { all } from 'redux-saga/effects';
import { watchFetchDestinations, watchFetchThemes } from './global';
import { watchFetchDestination } from './destination';
import { watchFetchHome } from './home';
import { watchFetchArticle } from './article';

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

      // Article
      watchFetchArticle(),
    ]);
  } catch (err) {
    // TODO: Handle error, maybe show on alert...
  }
}
