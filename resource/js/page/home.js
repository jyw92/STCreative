function home() {
  console.log("home");
  homeParallax();
  spotlightAnimation();
  // const DOM = {
  //   area: document.querySelector('.section01'),
  //   video: document.querySelector('video'),
  // }


  // const fixedHeader = gsap.timeline()
  // .to('#header', { backgroundColor:'transparent'})
  // .to('#header nav ul li a', {color:'#000', fontWeight:600},0)
  // .to('#logo img', {attr:{src:'./resource/images/logo_STC.svg'}},0)
}


function spotlightAnimation() {
  // const mainVis = document.querySelector('.no-main-vis');

  // if (!mainVis) return;
  gsap.fromTo(
      '.section01--spotlight div',
      {
          x: '-75%',
      },
      {
          x: '75%',
          repeat: -1,
          yoyo: true,
          duration: 2.5,
          ease: 'none',
      }
  );
}

function heroAnimation(){
  const DOM = {
    // area: document.querySelector('.')
  }
}



function homeParallax(){

  const parallax = gsap.timeline({
    scrollTrigger:{
      trigger:'.section02',
      start:'top top',
      end:'+=300%',
      markers:true,
      scrub:true,
    }
  })

  const fixedVisualText = gsap.timeline({
    scrollTrigger:{
      trigger:'.section02--main--visual__text strong',
      start:'top top',
      end:'+=300%',
      markers:true,
      scrub:1,
      pin: true,
    }
  })

  gsap.utils.toArray('.parallax').forEach(layer => {
      const depth = layer.dataset.depth;
      const movement = -(layer.offsetHeight * depth);

      parallax.to(layer, { y: movement, duration:2, ease: "none", }, 0)
  });
  
}
