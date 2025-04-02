function home() {
  console.log("home");

  const fixedHeader = gsap.timeline()
  .to('#header', { backgroundColor:'transparent'})
  .to('#header nav ul li a', {color:'#000', fontWeight:600},0)
  .to('#logo img', {attr:{src:'./resource/images/logo_STC.svg'}},0)
  ScrollTrigger.create({
    trigger: '.section01',
    start: 'bottom top',
    end: 'bottom bottom',
    animation:fixedHeader ,
    pin: true,
    pinSpacing: false,
    markers: false,
    scrub: true,
  })
  const parallax = gsap.timeline({
    scrollTrigger:{
      trigger:'.section02',
      start:'top top',
      end:'+=2000',
      markers:true,
      scrub:true,
    }
  })

  gsap.timeline({
    scrollTrigger:{
      trigger:'.txt',
      start:'top top',
      end:'+=2000',
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

const loader = () => {
  const tl = gsap
    .timeline({
      defaults: {
        ease: "none",
      },
    })
    .fromTo(
      ".loader--logo img",
      { yPercent: 100 },
      { yPercent: 0, duration: 1.5 }
    );
};
