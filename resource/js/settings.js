


gsap.registerPlugin(ScrollTrigger);
const container = document.querySelector("#scrollContainer");
const options = {
  damping: 0.1,
  alwaysShowTracks: false,
};
const scrollbar = Scrollbar.init(container, {
  ...options,
});

ScrollTrigger.scrollerProxy(container, {
  scrollTop(value) {
    if (arguments.length) {
      scrollbar.scrollTop = value; // setter
    }
    return scrollbar.scrollTop; // getter
  },
});
scrollbar.addListener((e) => {
  ScrollTrigger.update();
  if (e.offset.y > 0) {
    if (document.getElementById('header')) {
      document.getElementById('header').classList.add("--scrolling");
    }
  } else {
    if (document.getElementById('header')) {
      document.getElementById('header').classList.remove("--scrolling");
    }
  }
});

ScrollTrigger.defaults({ scroller: container });

barba.hooks.leave(() => {
  ScrollTriger.getAll().forEach((t) => t.kill());
});
barba.hooks.after(() => {
  scrollbar.update();
  scrollbar.scrollTo(0, 0);
  markers();
  start();
  Splitting();
  headerProgress();
});
