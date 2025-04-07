<<<<<<< HEAD
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
=======
// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

/**
 * 홈페이지 메인 애니메이션 초기화 함수
 */
function home() {
  // 각 애니메이션 함수 호출
  homeParallax();
  spotlightAnimation();
  heroAnimation();
  stickScrollIcon('.scroll--view--inner');
  initParticles('tsparticles-1');
  initParticles('tsparticles-2');
  galleryAnimation();
}

/**
 * 스크롤 아이콘 애니메이션
 * @param {string} selector - 스크롤 아이콘 선택자
 */
function stickScrollIcon(selector) {
  // 스크롤 시 아이콘 위치 조정
  gsap.to(selector, {
    top: '88vh',
    scrollTrigger: {
      trigger: '.section01--hero',
      start: 'center center',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
      scrub: true,
    },
  });

<<<<<<< HEAD
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
=======
  // 푸터에서 아이콘 페이드아웃
  gsap.fromTo(
    selector,
    {opacity: 1},
    {
      opacity: 0,
      scrollTrigger: {
        trigger: '#footer',
        start: 'top bottom',
        toggleActions: 'restart pause resume reverse',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
      },
    }
  );
}
<<<<<<< HEAD
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
=======

/**
 * 스포트라이트 애니메이션
 */
function spotlightAnimation() {
  gsap.fromTo(
    '.section01--spotlight div',
    {x: '-75%'},
    {
      x: '75%',
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: 'none',
    }
  );
}

/**
 * 히어로 섹션 애니메이션
 */
function heroAnimation() {
  // DOM 요소 선택
  const DOM = {
    area: document.querySelector('.section01--main'),
    video: document.querySelector('.section01--main--video'),
    title: gsap.utils.toArray('.section01--hero--title > div'),
    banner: document.querySelector('.section01--main--video--banner'),
    bannerTitle: document.querySelector('.section01--main--video--banner--title'),
    bannerGallery: document.querySelector('.section01--main--video--banner--vertical'),
    galleryItem: document.querySelector('.vertical--item'),
    galleryItems: gsap.utils.toArray('.section01--main--video--banner--vertical > .vertical--item'),
    titleLine: document.querySelector('.section01--main--video--banner--title .title--line '),
  };

  // 영역 높이 설정
  gsap.set(DOM.area, {
    height: DOM.bannerGallery.offsetHeight * DOM.galleryItems.length,
  });

  // 텍스트 분할 애니메이션 대상
  const targets = gsap.utils.toArray('.split');
  const targets2 = gsap.utils.toArray('.split2');

  // 텍스트 분할 애니메이션 함수
  function split(targets) {
    targets.forEach((target) => {
      const SplitClient = new SplitType(target, {type: 'lines, words, chars'});
      const chars = SplitClient.chars;
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a

      gsap.from(chars, {
        yPercent: 100,
        autoAlpha: 0,
        duration: 1,
<<<<<<< HEAD
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
=======
        ease: 'circ.out',
        stagger: {
          amount: 1,
          from: 'random',
        },
        scrollTrigger: {
          trigger: target,
          start: 'top bottom',
          end: '+=400',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
        },
      });
    });
  }
<<<<<<< HEAD
  split(targets);
  gsap.set(DOM.banner,{y: 100 });
  ScrollTrigger.create({
    id: "section01--main",
    trigger: DOM.area,
    start: "top top",
    end: "+=300%;",
=======

  // 초기 텍스트 분할 실행
  split(targets);

  // 배너 초기 위치 설정
  gsap.set(DOM.banner, {y: 100});

  // 메인 섹션 스크롤 트리거 설정
  ScrollTrigger.create({
    id: 'section01--main',
    trigger: DOM.area,
    start: 'top top',
    end: 'bottom bottom',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
    anticipatePin: 1,
<<<<<<< HEAD
    // markers:true
  });

  let tl;
  ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
=======
  });

  // 반응형 애니메이션 설정
  let tl;
  ScrollTrigger.matchMedia({
    // 데스크탑 애니메이션
    '(min-width: 769px)': () => {
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
      tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: DOM.area,
<<<<<<< HEAD
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
=======
            start: '20% bottom',
            end: 'bottom bottom',
            scrub: 1,
            id: 'main-ani',
          },
        })
        .to(DOM.video, {
          clipPath: 'circle(10% at 50% 50%)',
          duration: 1,
        })
        .to(DOM.video, {
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.5,
        });
    },
    // 모바일 애니메이션
    '(max-width: 768px)': () => {
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
      tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: DOM.area,
<<<<<<< HEAD
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
=======
            start: '20% bottom',
            end: '100% bottom',
            scrub: 1,
            id: 'main-ani',
          },
        })
        .to(DOM.video, {
          clipPath: 'circle(20% at 50% 50%)',
          duration: 1,
        })
        .to(DOM.video, {
          clipPath: 'circle(100% at 50% 50%)',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
          duration: 1.5,
        });
    },
  });
<<<<<<< HEAD
 
=======
  // 배너 애니메이션 추가
  gsap.from(
    DOM.titleLine,
    {
      scaleX: 0,
      transformOrigin: 'left center',
      scrub: 1,
      duration: 5,
    },
    '+=2'
  );
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
  tl.to(
    DOM.banner,
    {
      autoAlpha: 1,
      y: 120,
      duration: 1.5,
<<<<<<< HEAD
      ease: "power4.inOut",
=======
      ease: 'power4.inOut',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
      once: () => {
        split(targets2);
      },
    },
<<<<<<< HEAD
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
=======
    '<'
  )

    .to(
      DOM.bannerGallery,
      {
        y: '-60%',
        duration: 3,
        ease: 'none',
      },
      '-=0.5'
    )
    .timeScale(0.1);
}

/**
 * 홈 페이지 패럴랙스 효과
 */
function homeParallax() {
  const fixedVisualText = gsap.timeline({
    scrollTrigger: {
      trigger: '.section02--main--visual__text strong',
      start: 'top top',
      end: '+=200%',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
      // markers: true,
      scrub: 1,
      pin: true,
    },
  });

<<<<<<< HEAD
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
=======
  // 큐브 요소 선택
  const cube = document.querySelector('.cube');
  const boxes = document.querySelectorAll('.stc--status__item');

  // 박스 애니메이션 타임라인
  const boxesTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section02',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1, // 스크롤 속도에 따라 애니메이션 속도 조절
      // markers: true, // 개발 시 마커 표시 (필요시 주석 해제)
    },
  });

  // 박스 애니메이션 추가
  boxesTl
    .from(boxes[0], {y: 150, autoAlpha: 0, borderRadius: 200, duration: 2, ease: 'elastic '})
    .from(boxes[1], {y: 150, autoAlpha: 0, borderRadius: 200, duration: 2, ease: 'elastic '}, '-=0.4')
    .from(boxes[2], {y: 150, autoAlpha: 0, borderRadius: 200, duration: 2, ease: 'elastic '}, '-=0.4')
    .from(boxes[3], {y: 150, autoAlpha: 0, borderRadius: 200, duration: 2, ease: 'elastic '}, '-=0.4');

  // 큐브 컨테이너 초기 상태 설정
  gsap.set('.cube-container', {autoAlpha: 0});

  // 큐브 컨테이너 표시/숨김 애니메이션
  gsap.to('.cube-container', {
    scrollTrigger: {
      trigger: '.section02',
      start: 'top 80%', // 섹션이 화면의 80% 지점에 도달했을 때 시작
      end: 'bottom 20%', // 섹션의 하단이 화면의 20% 지점에 도달했을 때 끝
      toggleActions: 'play reverse play reverse',
    },
    autoAlpha: 1,
    duration: 0.5,
  });

  // 큐브 회전 애니메이션 - 스크롤과 무관하게 계속 회전
  const cubeRotation = gsap.to(cube, {
    rotateX: 360,
    rotateY: 360,
    rotateZ: 360,
    duration: 8, // 한 바퀴 도는데 8초 소요
    ease: 'none', // 일정한 속도로 회전
    repeat: -1, // 무한 반복
    paused: true, // 처음에는 일시 정지 상태
  });

  // 스크롤 트리거 - 큐브 회전 및 크기/색상 변화
  ScrollTrigger.create({
    trigger: '.section02',
    start: 'top 80%', // 섹션이 화면의 80% 지점에 도달했을 때 시작
    end: 'bottom 20%', // 섹션의 하단이 화면의 20% 지점에 도달했을 때 끝
    onEnter: () => {
      // 스크롤이 트리거 영역에 들어오면 회전 시작
      cubeRotation.play();
    },
    onLeave: () => {
      // 스크롤이 트리거 영역을 벗어나면 회전 일시 정지 (선택적)
      // cubeRotation.pause(); // 회전을 멈추고 싶지 않다면 이 줄을 주석 처리
    },
    onEnterBack: () => {
      // 스크롤이 다시 트리거 영역으로 돌아오면 회전 재개
      cubeRotation.play();
    },
    onLeaveBack: () => {
      // 스크롤이 트리거 영역 위로 벗어나면 회전 일시 정지 (선택적)
      // cubeRotation.pause(); // 회전을 멈추고 싶지 않다면 이 줄을 주석 처리
    },
    onUpdate: (self) => {
      // 스크롤 진행률에 따라 큐브 크기 변화 (80% ~ 120%)
      const scale = 0.8 + self.progress * 0.4;
      gsap.set(cube, {scale: scale});

      // 스크롤 속도에 따라 회전 속도 조절
      const scrollSpeed = Math.abs(self.getVelocity() / 1000);
      const speedFactor = Math.max(0.5, Math.min(2, 1 + scrollSpeed / 5)); // 0.5 ~ 2 범위로 제한
      cubeRotation.timeScale(speedFactor); // 회전 속도 조절

      // 스크롤 속도에 따라 테두리 색상 변화
      const intensity = Math.min(1, scrollSpeed / 5); // 최대 1

      // 파란색에서 보라색으로 변화
      const blueValue = 255 - Math.floor(intensity * 155);
      const redValue = Math.floor(intensity * 100);

      const borderColor = `rgb(${redValue}, ${100 - redValue}, ${blueValue})`;
      gsap.set('.face', {borderColor: borderColor});
    },
  });
}

/**
 * 파티클 애니메이션 초기화
 */
function initParticles(target) {
  tsParticles.load(target, {
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
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
<<<<<<< HEAD
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
=======
        value: ['#3998D0', '#2EB6AF', '#A9BD33', '#FEC73B', '#F89930', '#F45623', '#D62E32'],
      },
      destroy: {
        mode: 'split',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
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
<<<<<<< HEAD
              mode: "none",
=======
              mode: 'none',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
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
<<<<<<< HEAD
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
=======
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
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
<<<<<<< HEAD
        mode: "destroy",
=======
        mode: 'destroy',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
      },
      move: {
        enable: true,
        speed: 7,
<<<<<<< HEAD
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
=======
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
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
<<<<<<< HEAD
=======

function galleryAnimation() {
  const section = document.querySelector('.stc-prjIntro');
  const DOM = {
    inner: section.querySelector('.stc-prjIntro__inner'),
    boxes: section.querySelectorAll('.stc-prjIntro__inner div'),
    title: section.querySelector('.stc-prjIntro__box1 h2 span'),
    title2: section.querySelector('.stc-section-title--big'),
    titleLine: section.querySelector('.stc-prjIntro__box1 .title--line'),
    columns: section.querySelectorAll('.stc-prjIntro__col'),
    box1: section.querySelector('.stc-prjIntro__box1'),
    box2: section.querySelector('.stc-prjIntro__box2'),
    cols: section.querySelectorAll('.stc-prjIntro__col'),
    gal: section.querySelector('.stc-prjIntro__gal'),
    wrap: section.querySelector('.stc-prjIntro__wrap'),
  };
  // projects title text

  // const titleText = new SplitType(DOM.title);
  // const prjText = new SplitType(document.querySelector('.stc-prjIntro__highlight span'));

  ScrollTrigger.matchMedia({
    '(min-width: 769px)': function () {
      const galTL = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=450%',
            pin: true,
            scrub: true,
          },
          defaults: {
            duration: 2,
          },
        })
        .from(DOM.title2, {yPercent: 100, autoAlpha: 0, ease: 'elastic'}, '<')
        .from(DOM.titleLine, {scaleX: 0, transformOrigin: 'left center'}, '<')
        .to(DOM.box1, {
          x: '-65vw',
          duration: 3.5,
        })
        .to(
          DOM.box2,
          {
            x: '-65vw',
            duration: 3.5,
          },
          '<'
        )
        .to(
          DOM.cols[0],
          {
            y: '25%',
            duration: 3.5,
          },
          '<'
        )
        .to(
          DOM.cols[1],
          {
            y: '45%',
            duration: 3.5,
          },
          '<'
        )
        .to(
          DOM.cols[2],
          {
            y: '15%',
            duration: 3.5,
          },
          '<'
        )
        .to(
          DOM.cols[3],
          {
            y: '60%',
            duration: 3.5,
          },
          '<'
        );
    },
  });
}

>>>>>>> aee7a308694bd01496397285d79ca06ea4c0ce6a
export default home;
