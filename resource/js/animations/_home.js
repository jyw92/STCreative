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
  awsome();
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
      const SplitClient = new SplitType(target, {
        type: 'lines, words, chars',
      });
      const chars = SplitClient.chars;

      gsap.from(chars, {
        yPercent: 100,
        autoAlpha: 0,
        duration: 1,
        ease: 'circ.out',
        stagger: {
          amount: 1,
          from: 'random',
        },
        scrollTrigger: {
          trigger: target,
          start: 'top bottom',
          end: '+=400',
        },
      });
    });
  }

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
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
    anticipatePin: 1,
  });

  // 반응형 애니메이션 설정
  let tl;
  ScrollTrigger.matchMedia({
    // 데스크탑 애니메이션
    '(min-width: 769px)': () => {
      tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: DOM.area,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.5,
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
    // 모바일 애니메이션
    '(max-width: 768px)': () => {
      tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: DOM.area,
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
          duration: 1.5,
        });
    },
  });
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
  tl.to(
    DOM.banner,
    {
      autoAlpha: 1,
      y: 120,
      duration: 1,
      ease: 'power4.inOut',
      once: () => {
        split(targets2);
      },
    },
    '<'
  )

    .to(
      DOM.bannerGallery,
      {
        y: '-60%',
        duration: 1,
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

/**
 * 파티클 애니메이션 초기화
 */
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
            id: 'gallery-ani',
            markers: true,
            scroller: '#scrollContainer',
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
        // 스크롤 방향에 따라 로고 변경
        if (self.direction === -1 && self.progress < 0.3) {
          // 위로 스크롤 중이고 진행률이 30% 미만일 때
          DOM.logo.setAttribute('src', originalLogoSrc);
        } else if (self.direction === 1 && self.progress > 0.3) {
          // 아래로 스크롤 중이고 진행률이 30% 이상일 때
          DOM.logo.setAttribute('src', newLogoSrc);
        }
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
    .to('header', {backgroundColor: '#000', duration: 1}, '<')
    .to('#header nav ul li a', {color: '#fff', duration: 1}, '<')
    // 로고 이미지 경로 변경
    .call(
      function () {
        // 직접 src 속성 변경
        DOM.logo.setAttribute('src', '../resource/images/logo_STC_white.svg');
      },
      [],
      '-=0.5'
    ) // 타이밍 조정
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

  // 애니메이션 완료 후 유지
  // .to({}, {duration: 0.5}); // 최종 상태 유지
}

export default home;
