function home() {
  console.log("home");
  homeParallax();
  spotlightAnimation();
  heroAnimation();
  stickScrollIcon(".scroll--view--inner");
  Particles();
}
function stickScrollIcon(param) {
  gsap.to(param, {
    top: "88vh",
    scrollTrigger: {
      trigger: ".section01--hero",
      start: "center center",
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
        trigger: "#footer",
        start: "top bottom",
        toggleActions: "restart pause resume reverse",
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
    title: gsap.utils.toArray(".section01--hero--title > div"),
    banner: document.querySelector(".section01--main--video--banner"),
    bannerTitle: document.querySelector(
      ".section01--main--video--banner--title"
    ),
    bannerGallery: document.querySelector(
      ".section01--main--video--banner--vertical"
    ),
    galleryItem: document.querySelector(".vertical--item"),
    galleryItems: gsap.utils.toArray(
      ".section01--main--video--banner--vertical > .vertical--item"
    ),
  };
  gsap.set(DOM.area,{height:DOM.bannerGallery.offsetHeight * DOM.galleryItems.length})
  // gsap.set(DOM.area,{height:'30000px'})
  const targets = gsap.utils.toArray(".split");
  const targets2 = gsap.utils.toArray(".split2");
  function split(targets) {
    targets.forEach((target) => {
      let SplitClient = new SplitType(target, { type: "lines, words, chars" });
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
          from: "random",
        },
        scrollTrigger: {
          trigger: target,
          start: "top bottom",
          end: "+=400",
          // markers: true
        },
      });
    });
  }
  split(targets);
  gsap.set(DOM.banner,{y: 100 });
  ScrollTrigger.create({
    id: "section01--main",
    trigger: DOM.area,
    start: "top top",
    end: "+=300%;",
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
    anticipatePin: 1,
    // markers:true
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
 
  tl.to(
    DOM.banner,
    {
      autoAlpha: 1,
      y: 120,
      duration: 1.5,
      ease: "power4.inOut",
      once: () => {
        split(targets2);
      },
    },
    "<"
  );
  tl.to(
    DOM.bannerGallery,
    {
      y: innerHeight - DOM.galleryItems.length * DOM.bannerGallery.offsetHeight,
      duration: 3, 
      ease:'none',
    },
    "-=0.5"
  ).timeScale(0.1);


  console.log("DOM.bannerGallery.offsetHeight", DOM.galleryItems.innerHeight);
}
function homeParallax() {
  const parallax = gsap.timeline({
    scrollTrigger: {
      trigger: ".section02",
      start: "top top",
      end: "+=300%",
      // markers: true,
      scrub: true,
    },
  });

  const fixedVisualText = gsap.timeline({
    scrollTrigger: {
      trigger: ".section02--main--visual__text strong",
      start: "top top",
      end: "+=300%",
      // markers: true,
      scrub: 1,
      pin: true,
    },
  });

  gsap.utils.toArray(".parallax").forEach((layer) => {
    const depth = layer.dataset.depth;
    const movement = -(layer.offsetHeight * depth);

    parallax.to(
      layer,
      { y: movement, duration: 2, scale: 2, ease: "power3.inOut" },
      0
    );
  });
}
function Particles() {
  tsParticles.load("tsparticles", {
    fpsLimit: 60,
    backgroundMode: {
      enable: true,
      zIndex: -1,
    },
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: [
          "#3998D0",
          "#2EB6AF",
          "#A9BD33",
          "#FEC73B",
          "#F89930",
          "#F45623",
          "#D62E32",
        ],
      },
      destroy: {
        mode: "split",
        split: {
          count: 1,
          factor: {
            value: 5,
            random: {
              enable: true,
              minimumValue: 4,
            },
          },
          rate: {
            value: 10,
            random: {
              enable: true,
              minimumValue: 5,
            },
          },
          particles: {
            collisions: {
              enable: false,
            },
            destroy: {
              mode: "none",
            },
            life: {
              count: 1,
              duration: {
                value: 1,
              },
            },
          },
        },
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          sides: 5,
        },
      },
      opacity: {
        value: 1,
        random: false,
        animation: {
          enable: false,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: 8,
        random: {
          enable: true,
          minimumValue: 4,
        },
        animation: {
          enable: false,
          speed: 40,
          minimumValue: 0.1,
          sync: false,
        },
      },
      collisions: {
        enable: true,
        mode: "destroy",
      },
      move: {
        enable: true,
        speed: 7,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    detectRetina: true,
  });
}
export default home;
