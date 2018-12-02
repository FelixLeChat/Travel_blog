import { reducer as global } from './global';
import { reducer as ui } from './ui';
import { reducer as home } from './home';
import { reducer as destination } from './destination';
import { reducer as article } from './article';

// Expose reducers
export default {
  global,
  ui,
  home,
  destination,
  article,
};
