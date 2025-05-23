/* -------------------------------------------------------------------------- */
/*                                     비활성                                 */
/* -------------------------------------------------------------------------- */
function markers(scrollbar){
  if (document.querySelector('.gsap-marker-scroller-start')) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

    scrollbar.addListener(({ offset }) => {
      gsap.set(markers, { marginTop: -offset.y });
    });
  }
}

export default markers; 