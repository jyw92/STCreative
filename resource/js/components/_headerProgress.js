function headerProgress() {
  gsap.to("progress", {
    value: 100,
    ease: "none",
    scrollTrigger: { scrub: 0.3 },
  });
}

export default headerProgress;
