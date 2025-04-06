function devStart() {
  const sectionColors = [
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#6eceda',
    '#FB9DA7',
    '#FCCCD4',
    '#FBDEA2',
    '#F2E2C6',
    '#8EB695',
  ];

  gsap.set('.section', {background: gsap.utils.wrap(sectionColors)});

  // gsap.utils.toArray('.section').forEach((item, index) => {
  //   let h2 = `<i style="position:absolute;top:10px;left:50%;transform:translateX(-50%)">section${index + 1}</i>`;
  //   item.insertAdjacentHTML('beforeend', h2);
  // });
}
export default devStart;
