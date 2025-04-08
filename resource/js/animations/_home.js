function home() {
  // 각 애니메이션 함수 호출
  // homeParallax();
  spotlightAnimation();
  heroAnimation();
  stickScrollIcon('.scroll--view--inner');
  // initParticles("tsparticles-1");
  scroll();
  galleryAnimation();
  awsome();
  contactAnimation();
  waypointEvent();
}
function waypointEvent() {
  document.addEventListener('DOMContentLoaded', function () {
    var item3 = document.querySelector('#item-3 .content__text');
    var observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            document.querySelector('#item-3').classList.add('is-active'); // 활성화 클래스 추가
          } else {
            document.querySelector('#item-3').classList.remove('is-active'); // 클래스 제거
          }
        });
      },
      {
        root: null, // 뷰포트를 기준으로
        rootMargin: '0px', // 여백 없음
        threshold: 0, // 요소가 0% 보이기 시작할 때 트리거
      }
    );

    if (item3) {
      observer.observe(item3); // 대상 요소 감시 시작
    }
  });
}
const setupAnimationDefaults = (itemElement, options) => {
  let defaults = {
    clipPaths: {
      step1: {
        initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        final: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)',
      },
      step2: {
        initial: 'polygon(50% 50%, 50% 0%, 50% 100%, 50% 50%)',
        final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
    },
    // Default scroll trigger settings
    scrollTrigger: {
      trigger: itemElement,
      start: 'top 50%',
      end: '+=50%',
      scrub: true,
    },
    // Default perspective setting
    perspective: false,
  };

  // Merge defaults with options provided
  if (options && options.scrollTrigger) {
    defaults.scrollTrigger = {
      ...defaults.scrollTrigger,
      ...options.scrollTrigger,
    };
  }

  // Merge and return the complete settings
  return {
    ...defaults,
    ...options,
    scrollTrigger: defaults.scrollTrigger,
  };
};
const cardMotion3D = (itemElement, options) => {
  // Set up the animation settings
  const settings = setupAnimationDefaults(itemElement, options);
  // Select the elements to animate
  const imageElement = itemElement.querySelector('.content__img');
  const innerElements = imageElement.querySelectorAll('.content__img-inner'); // Now it selects both inners
  const text = itemElement.querySelector('.content__text');

  return (
    gsap
      .timeline({
        defaults: {
          ease: 'none',
        },
        onStart: () => {
          if (settings.perspective) {
            gsap.set([imageElement, itemElement], {
              perspective: settings.perspective,
            });
          }
        },
        scrollTrigger: settings.scrollTrigger,
      })
      .fromTo(
        imageElement,
        {
          scale: 0.5,
          filter: 'brightness(100%) contrast(100%)',
          'clip-path': settings.clipPaths.step1.initial,
        },
        {
          ease: 'sine',
          rotationX: -35,
          rotationY: 35,
          filter: 'brightness(6%) contrast(100%)',
          scale: 1,
          'clip-path': settings.clipPaths.step1.final,
        },
        0
      )
      .to(
        innerElements[0],
        {
          ease: 'sine',
          skewY: 10,
          scaleY: 1.2,
        },
        0
      )

      // Switch image
      .add(() => {
        // Toggle the visibility of the inner elements
        innerElements[0].classList.toggle('content__img-inner--hidden');
        innerElements[1].classList.toggle('content__img-inner--hidden');
      }, '>')
      .to(
        imageElement,
        {
          ease: 'sine.in',
          startAt: {
            'clip-path': settings.clipPaths.step2.initial,
          },
          'clip-path': settings.clipPaths.step2.final,
          filter: 'brightness(100%) contrast(100%)',
          scale: 1,
          rotationX: 0,
          rotationY: 0,
        },
        '<'
      )
      .to(
        innerElements[1],
        {
          ease: 'sine.in',
          startAt: {skewY: 10, scaleY: 2},
          skewY: 0,
          scaleY: 1,
        },
        '<'
      )

      .fromTo(
        text,
        {
          opacity: 0,
          yPercent: 40,
        },
        {
          opacity: 1,
          yPercent: 0,
        },
        '>'
      )
      .to(
        imageElement,
        {
          ease: 'sine',
          startAt: {filter: 'brightness(100%) contrast(100%) opacity(100%)'},
          filter: 'brightness(60%) contrast(100%) opacity(0%)',
          rotationX: 25,
          rotationY: 2,
          scale: 1.2,
        },
        '<'
      )
  );
};
/**
 * 스크롤 아이콘 애니메이션
 * @param {string} selector - 스크롤 아이콘 선택자
 */
function stickScrollIcon(selector) {
  // 스크롤 시 아이콘 위치 조정
  gsap.to(selector, {
    top: '88vh',
    scrollTrigger: {
      trigger: '.stc-main-vis__hero',
      start: 'center center',
      scrub: true,
    },
  });

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
      },
    }
  );
}

function spotlightAnimation() {
  gsap.fromTo(
    '.stc-main-vis__spotlight div',
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

function heroAnimation() {
  const DOM = {
    area: document.querySelector('.stc-main-area'),
    video: document.querySelector('.stc-main-vis__video'),
    overlay: document.querySelector('.stc-main-vis__overlay'),
    title: gsap.utils.toArray('.stc-main-vis__intro-title > div'),
    desc: document.querySelector('.stc-main-vis__intro-desc'),
  };

  const videoTitle = new SplitType(DOM.title);
  const videoDesc = new SplitType(DOM.desc);
  let tl;
  gsap.set(videoTitle.lines, {overflow: 'hidden'});
  gsap.set(videoDesc.lines, {overflow: 'hidden'});
  gsap.set(videoTitle.words, {y: '100%'});
  gsap.set(videoDesc.chars, {y: '100%'});

  ScrollTrigger.create({
    id: 'main-vis',
    trigger: DOM.area,
    start: 'top top',
    end: '+=300%',
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
    anticipatePin: 1,
    // markers:true,
  });

  ScrollTrigger.matchMedia({
    '(min-width: 769px)': function () {
      tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: DOM.area,
            start: '20% bottom',
            end: '100% bottom',
            scrub: 1,
            id: 'main-ani',
            // markers: true,
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
    '(max-width: 768px)': function () {
      tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: DOM.area,
            start: '20% bottom',
            end: '100% bottom',
            scrub: 1,
            id: 'main-ani',
            // markers: true,
          },
        })
        .to(DOM.video, {
          clipPath: 'circle(20% at 50% 50%)',
          duration: 1,
        })
        .to(DOM.video, {
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.5,
        });
    },
  });

  tl.to(
    DOM.overlay,
    {
      opacity: 0,
    },
    '<'
  )
    .to(
      videoTitle.lines,
      {
        opacity: 1,
        duration: 0.5,
      },
      '-=1'
    )
    .to(
      videoTitle.words,
      {
        y: '0%',
        duration: 0.5,
      },
      '<'
    )
    .to(
      '.stc-main-vis__intro-desc',
      {
        opacity: 1,
      },
      '-=0.5'
    )
    .to(
      videoDesc.chars,
      {
        y: '0%',
        opacity: 1,
        stagger: 0.05,
      },
      '<'
    );
}

function homeParallax() {
  // 큐브 요소 선택
  const cube = document.querySelector('.cube');
  const boxes = document.querySelectorAll('.stc--status__item');
  const counter = document.querySelectorAll('.counter');

  // 먼저 fixedVisualText 실행
  const fixedVisualText = gsap.timeline({
    scrollTrigger: {
      trigger: '.section02--main--visual__text strong',
      start: 'top top',
      end: '+=100%',
      // markers: true,
      // scrub: 1,
      pin: true,
    },
    onComplete: () => {
      // 완료 후 실행
      // fixedVisualText 완료 후 tl 실행
      tl.play(); // tl 타임라인 실행
    },
  });

  // 미리 tl 타임라인을 정의
  const tl = gsap.timeline({paused: true}); // 일단 멈춘 상태로 정의
  [0, 1, 2, 3].forEach((index) => {
    tl.call(() => counterAnimation(counter[index])).from(
      boxes[index],
      {
        y: 150,
        autoAlpha: 0,
        borderRadius: 200,
        duration: 0.5,
        ease: 'elastic',
      },
      '-=0.4'
    );
  });

  function counterAnimation(target) {
    gsap.from(target, {
      textContent: 0,
      duration: 1,
      ease: 'power1.in',
      snap: {textContent: 1},
      stagger: {each: 0.8},
    });
  }

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

function initParticles(target) {
  tsParticles.load(target, {
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
        value: ['#3998D0', '#2EB6AF', '#A9BD33', '#FEC73B', '#F89930', '#F45623', '#D62E32'],
      },
      destroy: {
        mode: 'split',
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
              mode: 'none',
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
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000',
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
        mode: 'destroy',
      },
      move: {
        enable: true,
        speed: 7,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
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

function galleryAnimation() {
  const section = document.querySelector('.stc-prjIntro');
  // 원래 로고 경로 저장

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
    logo: document.querySelector('#header a img'),
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
            id: 'gallery-ani',
            onUpdate: (self) => {
              if (DOM.logo) {
                DOM.logo.setAttribute('src', '../resource/images/logo_STC.svg');
              }
            },
            // onEnter: () => {
            //   console.log("Triggered as section enters the viewport");
            //   if (DOM.logo) {
            //     DOM.logo.setAttribute("src", '../resource/images/logo_STC.svg');
            //   }
            // },
            // onLeave: () => {
            //   console.log("Triggered as section leaves the viewport");
            //   if (DOM.logo) {
            //     DOM.logo.setAttribute("src", '../resource/images/logo_STC.svg');
            //   }
            // },
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

function awsome() {
  const DOM = {
    awsomeWrap: document.querySelector('.awsome'),
    awsomeSlide: document.querySelector('.awsome .slide--text'),
    awsomeTitleWrap: document.querySelector('.awsome--title'),
    awsomeTitle_a: document.querySelector('.awsome--title .a'),
    awsomeTitle_b: document.querySelector('.awsome--title .b'),
    workList: document.querySelector('.workList'),
    logo: document.querySelector('#logo a img'),
  };
  // 타임라인 생성

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section04',
      start: 'top top', // 화면 상단에 섹션이 닿으면 시작
      end: '+=450%', // 스크롤 거리를 늘림 (원래 섹션 높이의 3배)
      scrub: 1, // 스크롤 속도와 애니메이션 속도 사이의 지연 증가
      // markers: true,
      pin: true, // 섹션 고정
      pinSpacing: true, // 고정된 요소 아래에 공간 생성
      anticipatePin: 1, // 핀 설정 전에 약간의 지연 추가
      onUpdate: (self) => {
        if (DOM.logo) {
          DOM.logo.setAttribute('src', newLogoSrc);
        }
      },
      onEnter: () => {
        initParticles('tsparticles-2');
      },
    },
  });
  // 원래 로고 경로 저장
  const originalLogoSrc = DOM.logo.getAttribute('src');
  const newLogoSrc = '../resource/images/logo_STC_white.svg';
  // 초기 z-index 설정
  gsap.set(DOM.awsomeTitleWrap, {zIndex: 1});

  // 애니메이션 추가
  tl
    // 타이틀 애니메이션 - 처음에 슬라이드 인
    .fromTo(DOM.awsomeTitle_a, {x: '-100%'}, {x: '0', ease: 'power1.out', duration: 0.5, color: '#fff'}, '<')
    .fromTo(DOM.awsomeTitle_b, {x: '100%'}, {x: '0', ease: 'power1.out', duration: 0.5, color: '#fff'}, '<')
    // 배경색 변경
    .to('body', {backgroundColor: '#000', duration: 1}, '<')
    .to('#header', {backgroundColor: '#000', duration: 1}, '<')
    .to('#header nav ul li a', {color: '#fff', duration: 1}, '<')
    // 타이틀 z-index 변경 - 갤러리 뒤로 보내기
    .to(
      DOM.awsomeTitleWrap,
      {
        zIndex: -1, // z축 뒤로 보내기
        duration: 0.1, // 빠르게 변경
      },
      '<'
    )

    // workList 애니메이션 - 아래에서 위로 올라오는 효과
    .fromTo(
      DOM.workList,
      {
        yPercent: 40, // 화면 아래에서 시작
      },
      {
        yPercent: -100, // 원래 위치로 이동
        duration: 2.5,
        ease: 'none',
      },
      '-=0.4'
    );
}

function contactAnimation() {
  ScrollTrigger.matchMedia({
    '(min-width: 769px)': function () {
      if (!document.querySelector('.stc-main-contact')) {
        return;
      }

      openSection();
    },
    '(max-width: 768px)': function () {
      if (!document.querySelector('.stc-main-contact')) {
        return;
      }
      openSection();
    },
  });
  playCircle();
}

function playCircle() {
  const mark = document.querySelector('.stc-contact-mark');
  if (!mark) return;

  gsap.to(mark, {
    rotation: 360,
    transformOrigin: 'center center',
    duration: 5,
    repeat: -1,
    ease: 'none',
  });

  gsap.to(mark, {
    repeat: -1,
    x: '-150%',
    ease: 'none',
    yoyo: true,
    duration: 5,
  });
}

function stickProgress() {
  const hook = document.getElementById('progress-hook');
  ScrollTrigger.create({
    trigger: hook,
    start: 'top 60px',
    end: '+=100%',
    pinSpacing: false,
    pin: true,
    toggleClass: {targets: hook, className: 'is-sticky'},
  });
}

function openSection() {
  const words = ['통계데이터', '유지보수', '솔루션구축', '웹개발', '기타'];
  const wordsEl = document.querySelector('.stc-main-contact__words');
  let distance = 0;
  // 원래 로고 경로 저장
  words.forEach((word) => {
    const span = document.createElement('span');
    span.innerText = word;
    wordsEl.append(span);

    if (!distance) {
      distance = span.offsetHeight;
    }
  });

  const wordTL = gsap.timeline({
    defaults: {ease: 'back.out(1.7)'},
    repeat: -1,
    duration: 1,
  });
  words.forEach((word, i) => {
    wordTL.to(wordsEl, {
      y: -(distance * (i * 1)),
      delay: 1,
    });
  });
  wordTL.to(wordsEl, {
    y: 0,
    delay: 1,
    duration: 1.75,
  });

  const section = document.querySelector('.stc-main-contact');
  const DOM = {
    content: section.querySelector('.stc-main-contact__content'),
    title: section.querySelector('.stc-main-contact__inquiry'),
    header: section.querySelector('.stc-main-contact__header'),
    splitTop: section.querySelector('.stc-main-contact__top'),
    splitBottom: section.querySelector('.stc-main-contact__bottom'),
    inner: section.querySelector('.stc-main-contact__inner'),
  };

  gsap.set(DOM.header, {
    clipPath: 'polygon(0px 0px, 100% 0px, 100% 50%, 0px 50%, 0px 50%, 100% 50%, 100% 100%, 0px 100%)',
  });

  const {chars: inquiryChars} = new SplitType(DOM.title);
  gsap.set(DOM.title, {overflow: 'hidden'});
  gsap.from(inquiryChars, {
    opacity: 0,
    y: '100%',
    stagger: 0.05,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: DOM.content,
      start: 'top top',
    },
  });

  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=100%',
        delay: 2,
        pin: DOM.header,
        scrub: true,
        pinSpacing: false,
      },
    })
    .to(DOM.header, {
      clipPath: 'polygon(0px 0px, 100% 0px, 100% 0%, 0px 0%, 0px 100%, 100% 100%, 100% 100%, 0px 100%)',
    })

    .to(
      DOM.splitTop,
      {
        yPercent: -30,
      },
      '<'
    )
    .to(
      DOM.splitBottom,
      {
        yPercent: 30,
      },
      '<'
    )
    .fromTo(
      DOM.inner,
      {
        backgroundColor: 'rgba(0,0,0)',
      },
      {
        backgroundColor: 'rgba(43, 71, 147)',
      },
      '<'
    )
    .to('#header', {backgroundColor: '#2B4793', boxShadow: 'none'}, '<');
}

const scroll = () => {
  // Define items and associate them with their animation profiles and options
  const items = [
    {
      id: '#item-3',
      animationProfile: cardMotion3D,
      options: {
        clipPaths: {
          step1: {
            initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            final: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)',
          },
          step2: {
            initial: 'polygon(50% 50%, 50% 0%, 50% 100%, 50% 50%)',
            final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          },
        },
        scrollTrigger: {
          start: 'center center',
          end: '+=200%',
          pin: true,
        },
        perspective: 400,
      },
    },
  ];

  // Iterate over the items and apply their animations
  items.forEach((item) => {
    const itemElement = document.querySelector(item.id);
    // Check if element exists and has an animation profile
    if (itemElement && item.animationProfile) {
      // Apply the animation profile to the element with the specified options
      item.animationProfile(itemElement, item.options);

      // Check if the interactive tilt effect should be applied
      if (item.interactiveTilt) {
        // Instantiate the InteractiveTilt object for this item
        new InteractiveTilt(itemElement);
      }
    } else {
      // Warn if the element or animation profile is not found
      console.warn(`Element with ID ${item.id} or its animation profile is not defined.`);
    }
  });
};

export default home;
