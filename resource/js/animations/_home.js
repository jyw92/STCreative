function home() {
  console.log("home");
  homeParallax();
  spotlightAnimation();
  heroAnimation();
  stickScrollIcon('.scroll--view--inner')
}
function stickScrollIcon(param) {
  gsap.to(param, {
      top: '88vh',
      scrollTrigger: {
          trigger: '.section01--hero',
          start: 'center center',
          scrub: true,
      },
  });

  gsap.fromTo(
      param,
      {
          opacity: 1,
      },
      {
          opacity: 0,
          scrollTrigger: {
              trigger: '#footer',
              start: 'top bottom',
              toggleActions: 'restart pause resume reverse',
          },
      }
  );
}
function spotlightAnimation() {
  // const mainVis = document.querySelector('.no-main-vis');

  // if (!mainVis) return;
  gsap.fromTo(
    ".section01--spotlight div",
    {
      x: "-75%",
    },
    {
      x: "75%",
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "none",
    }
  );
}
function heroAnimation() {
  const DOM = {
    area: document.querySelector(".section01--main"),
    video: document.querySelector(".section01--main--video"),
    title: gsap.utils.toArray('.section01--hero--title > div'),
  };

  const targets = gsap.utils.toArray(".split");
        
  targets.forEach(target => {
      let SplitClient = new SplitType(target, {type: "lines, words, chars"});
      let lines = SplitClient.lines;
      let words = SplitClient.words;
      let chars = SplitClient.chars;

      gsap.from(chars, {
          yPercent: 100,
          autoAlpha: 0,
          duration: 1,
          ease: "circ.out",
          stagger: {
              amount: 1,
              from : "random"
          },
          scrollTrigger: {
              trigger: target,
              start: "top bottom",
              end: "+=400",
              markers: false
          }
      });
  });

  ScrollTrigger.create({
    id: "section01--main",
    trigger: DOM.area,
    start: "top top",
    end: "+=300%",
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
    anticipatePin: 1,
  });
  let tl;
  ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
      tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: DOM.area,
            start: "20% bottom",
            end: "100% bottom",
            scrub: 1,
            id: "main-ani",
            // markers: true,
          },
        })
        .to(DOM.video, {
          clipPath: "circle(10% at 50% 50%)",
          duration: 1,
        })
        .to(DOM.video, {
          clipPath: "circle(100% at 50% 50%)",
          duration: 1.5,
        });
    },
    "(max-width: 768px)": function () {
      tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: DOM.area,
            start: "20% bottom",
            end: "100% bottom",
            scrub: 1,
            id: "main-ani",
            // markers: true,
          },
        })
        .to(DOM.video, {
          clipPath: "circle(20% at 50% 50%)",
          duration: 1,
        })
        .to(DOM.video, {
          clipPath: "circle(100% at 50% 50%)",
          duration: 1.5,
        });
    },
  });
}
function homeParallax() {
  const parallax = gsap.timeline({
    scrollTrigger: {
      trigger: ".section02",
      start: "top top",
      end: "+=300%",
      markers: true,
      scrub: true,
    },
  });

  const fixedVisualText = gsap.timeline({
    scrollTrigger: {
      trigger: ".section02--main--visual__text strong",
      start: "top top",
      end: "+=300%",
      markers: true,
      scrub: 1,
      pin: true,
    },
  });

  gsap.utils.toArray(".parallax").forEach((layer) => {
    const depth = layer.dataset.depth;
    const movement = -(layer.offsetHeight * depth);

    parallax.to(layer, { y: movement, duration: 2, scale:2, ease: "power3.inOut" }, 0);
  });
}
