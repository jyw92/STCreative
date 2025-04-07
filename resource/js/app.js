console.log('app');
gsap.registerPlugin(ScrollTrigger);

import {scrollChkHeaderPaddingX_controller} from './helpers/func.js';
import {Home, Transition} from './animations/index.js';
import {Cursor, HeaderProgress, DevStart} from './components/index.js';

/* -------------------------------------------------------------------------- */
/*                                     App                                    */
/* -------------------------------------------------------------------------- */
async function App() {
  Transition.initTransition();
  const globalState = await Transition.initTransition();
  Cursor.setCursor();
  // HeaderProgress();
  Home();
  DevStart();
  scrollChkHeaderPaddingX_controller();
}
App();

/* -------------------------------------------------------------------------- */
/*                                    barba                                   */
/* -------------------------------------------------------------------------- */
barba.hooks.after(() => {
  App();
});
