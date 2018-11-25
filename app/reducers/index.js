import { reducer as global } from './global';
import { reducer as ui } from './ui';
import { reducer as home } from './home';
import { reducer as destination } from './destination';

// Expose reducers
export default {
  global,
  ui,
  home,
  destination,
};
