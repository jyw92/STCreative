
function initScrollBar() {
  const container = document.querySelector("#scrollContainer");
  const options = {
    damping: 0.1,
    delegateTo: document,
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
  scrollbar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: container });
  showMarkers(scrollbar);
}
function showMarkers(scrollbar) {
  if (document.querySelector('.gsap-marker-scroller-start')) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

    scrollbar.addListener(({ offset }) => {
      gsap.set(markers, { marginTop: -offset.y });
    });
  }
}

export default { initScrollBar };
