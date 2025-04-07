$('header .ham').click(function(){
    $('header').toggleClass('menuOn');
})

$('header nav > a').on('mousemove', function(event) {
    let x = event.pageX - $(this).offset().left;
    let y = event.pageY - $(this).offset().top;

    $(this).find('.circle').css({'left':`${x}px`,'top':`${y}px`})

    // console.log(`마우스 좌표: x = ${x}, y = ${y}`);
});

// marquee
const marquee = document.querySelector('.totalWrap .marquee .absol'); //marquee 박스 및 배경
const marqueeChildSize = marquee.querySelector('.totalWrap .marquee .absol .mar_ch'); //반복 대상의 실제 사이즈 (대상이 여러개라면 해당 대상들을 감싸는 부모)
const cloneMarqueeTimes = Math.ceil(marquee.getBoundingClientRect().width / marqueeChildSize.getBoundingClientRect().width) //marquee에 반복 요소를 넣을 횟수

for (let i = 0; i < cloneMarqueeTimes; i++) {
    const childClone = marqueeChildSize.cloneNode(); //반복 대상의 실제 사이즈로 지정한 대상으로 클론생성
    childClone.innerHTML = marqueeChildSize.innerHTML; //클론에 원본 콘텐츠 입력
    marquee.appendChild(childClone); //설정한 클론 마지막에 추가
}
//marqueeChildSize에 여러개가 들어가고 요소들의 간격을 넓혀야 한다면 padding 이용, box-sizing: border-box; 적용

gsap.fromTo('.totalWrap .marquee .absol .mar_ch', {
yPercent: 100
}, {
    yPercent: 0,
    repeat: -1,
    duration: 17,
    ease: 'none'
});