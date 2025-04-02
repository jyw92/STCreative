function start(){
  const sectionColors = [
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
  ];
  
  gsap.set(".section", { backgroundColor: gsap.utils.wrap(sectionColors) });
  
  gsap.utils.toArray(".section").forEach((item, index) => {
  //   let h2 = `
  // <h2>section${index + 1}</h2>
  // `;
  //   item.insertAdjacentHTML("beforeend", h2);
  });
}

gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector("#container");
const options = {
  damping: 0.1,
  alwaysShowTracks: true,
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

barba.hooks.leave(() => {
  ScrollTriger.getAll().forEach((t) => t.kill());
});
barba.hooks.after(() => {
  scrollbar.update();
  scrollbar.scrollTo(0, 0);
  markers();
  start();
});