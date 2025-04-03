

function barbaConfig() {
  barba.init({
    views: [
      { namespace: "home", beforeEnter: () => home() },
      { namespace: "about", beforeEnter: () => about() },
      { namespace: "service", beforeEnter: () => service() },
      { namespace: "contact", beforeEnter: () => contact() },
      { namespace: "reference", beforeEnter: () => reference() },
    ],
    transitions: [
      {
        name: "opacity-transition",
        leave: (data) => {
          //전페이지
          Transition.pageLeave(data);
        },
        enter(data) {
          //현재진입한 페이지지
          Transition.pageEnter(data);
        },
        once: () => {
          Transition.initTransition();
          markers();
          start();
          // scrollChkHeaderPaddingX_controller();
          Splitting();
          headerProgress();
        },
      },
    ],
  });
}
