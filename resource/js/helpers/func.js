function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }
  
  function calcWinsize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  
  function getPagePos(e) {
    return {
      x: e.pageX,
      y: e.pageY,
    };
  }
  
  function getMousePos(e) {
    return {
      x: e.clientX,
      y: e.clientY,
    };
  }
  
  function lerp(s, e, a) {
    return s + (e - s) * a;
  }
  
  function distance(x1, y1, x2, y2) {
    const a = x1 - x2;
    const b = y1 - y2;
  
    return Math.hypot(a, b);
  }
  
  function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }
  
  function scrollChkHeaderPaddingX_controller(){
    const windowHeight = innerHeight;
    const sectionHeightArray = [];
    const footerHeight = document.getElementById('footer').offsetHeight;
    const header = document.getElementById('header');
    gsap.utils.toArray('.section').forEach((section, index) => {
      const sectionHeight = section.offsetHeight;
      sectionHeightArray.push(sectionHeight);
    })
    let sum = sectionHeightArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0);
    sum += footerHeight;
    if(windowHeight < sum){
      header.style.width = 'calc(100% - 8px)';
    }else{
      header.style.width = '100%'
    }
  }
  export {
    getMousePos,
    getRandomFloat,
    distance,
    lerp,
    calcWinsize,
    getPagePos,
    delay,
    scrollChkHeaderPaddingX_controller,
  };
  