




/* -------------------------------------------------------------------------- */
/*                                Global State                                */
/* -------------------------------------------------------------------------- */
const MAIN_COLOR = "rgba(102, 54, 239)";
const TRANSPARENT_COLOR = "transparent";
let scrollContainer;

const globalState = {
  isDrawerOpen: false,
  isScrolling: false,
  isTransitioning: false,
  scrollbar: null,
};

const headerDOM = {
  header: document.getElementById('header'),
};

async function initTransition() {
  const scrollbar = await getScrollbar();
  globalState.scrollbar = scrollbar;
  return globalState;
}

/* -------------------------------------------------------------------------- */
/*                                  ScrollBar                                 */
/* -------------------------------------------------------------------------- */
async function getScrollbar() {
  scrollContainer = document.getElementById("scrollContainer");
  const options = {
    damping: 0.1,
    alwaysShowTracks: false,
  };
  const scrollbar = Scrollbar.init(scrollContainer, {
    ...options,
  });
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      if (arguments.length) {
        scrollbar.scrollTop = value; // setter
      }
      return scrollbar.scrollTop; // getter
    },
  });
  scrollbar.addListener((e) => {
    ScrollTrigger.update();
    globalState.offset = e.offset;
    if (e.offset.y > 0) {
      // globalState.isScrolling = true;
      headerDOM.header.classList.add("-scrolling");
    } else {
      // globalState.isScrolling = false;
      headerDOM.header.classList.remove("-scrolling");
    }
  });
  
  ScrollTrigger.defaults({ scroller: scrollContainer });
  showMarkers();
  return scrollbar;
}

function showMarkers() {
  if (document.querySelector('.gsap-marker-scroller-start')) {
      const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
      bodyScrollBar.addListener(({ offset }) =>
          gsap.set(markers, { marginTop: -offset.y })
      );
  }
}
export default {
  initTransition,
};