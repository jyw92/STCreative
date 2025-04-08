console.log('app');
gsap.registerPlugin(ScrollTrigger);

import {Home, Transition, MainIntro} from './animations/index.js';
import {Cursor, HeaderProgress, DevStart} from './components/index.js';

/* -------------------------------------------------------------------------- */
/*                                     App                                    */
/* -------------------------------------------------------------------------- */
async function App() {
  MainIntro();
  await Transition.initTransition();
  Cursor.setCursor();
  DevStart();
  Home();
}
App();

/* -------------------------------------------------------------------------- */
/*                                    barba                                   */
/* -------------------------------------------------------------------------- */
barba.hooks.after(() => {
  App();
});