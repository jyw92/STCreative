function headerProgress() {
  gsap.to('progress', {
    value: 100,
    ease: 'none',
    scrollTrigger: {scrub: 0.1},
  });
}

export default headerProgress;
