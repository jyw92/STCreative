function scrollChkHeaderPaddingX_controller(){
  const windowHeight = innerHeight;
  const sectionHeightArray = [];
  const footerHeight = document.getElementById('footer').offsetHeight;
  const header = document.getElementById('header');
  gsap.utils.toArray('.section').forEach((section, index) => {
    const sectionHeight = section.offsetHeight;
    sectionHeightArray.push(sectionHeight);
  })
  let sum = sectionHeightArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0);
  sum += footerHeight;
  if(windowHeight < sum){
    header.style.width = 'calc(100% - 8px)';
  }else{
    header.style.width = '100%'
  }
}



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
        leave: ({ current }) => {
          //전페이지
          console.log("current", current)
        },
        enter({ next }) {
          //현재진입한 페이지지
          console.log("next" ,next);
        },
        once: () => {
          markers();
          start();
          scrollChkHeaderPaddingX_controller();
        },
      },
    ],
  });
}
