/* -------------------------------------------------------------------------- */
/*                                Global State                                */
/* -------------------------------------------------------------------------- */
const MAIN_COLOR = 'rgba(102, 54, 239)';
const TRANSPARENT_COLOR = 'transparent';
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
  scrollContainer = document.getElementById('scrollContainer');
  const options = {
    damping: 0.1,
    delegateTo: document,
    alwaysShowTracks: false,
  };
  const scrollbar = Scrollbar.init(scrollContainer, options);

  // scrollerProxy 설정
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      if (arguments.length) {
        scrollbar.scrollTop = value;
      }
      return scrollbar.scrollTop;
    },
    // getBoundingClientRect() {
    //   return {
    //     top: 0,
    //     left: 0,
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //   };
    // },
    // pinType: scrollContainer.style.transform ? 'transform' : 'fixed',
  });

  scrollbar.addListener((e) => {
    ScrollTrigger.update();
    globalState.offset = e.offset;
    if (e.offset.y > 0) {
      globalState.isScrolling = true;
      headerDOM.header.classList.add('--scrolling');
    } else {
      globalState.isScrolling = false;
      headerDOM.header.classList.remove('--scrolling');
    }
  });

  // ScrollTrigger의 기본 scroller를 설정
  ScrollTrigger.defaults({scroller: scrollContainer});

  // ScrollTrigger를 새로고침하여 변경 사항을 반영
  ScrollTrigger.refresh();

  // 마커 위치 조정을 위한 함수 호출
  showMarkers(scrollContainer);

  return scrollbar;
}

function showMarkers(getScrollbar) {
  if (document.querySelector('.gsap-marker-scroller-start')) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
    scrollbar.addListener(({offset}) => {
      gsap.set(markers, {marginTop: -offset.y});
    });
  }
}
export default {
  initTransition,
};
