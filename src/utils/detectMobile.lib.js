/**
 * Detect mobile device
 * https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
 * @returns {Bool}
 */

function detectMobile() {
  const agent = navigator.userAgent || navigator.vendor || window.opera;
  return (agent.match(/Android/i)
    || agent.match(/webOS/i)
    || agent.match(/iPhone/i)
    || agent.match(/iPad/i)
    || agent.match(/iPod/i)
    || agent.match(/BlackBerry/i)
    || agent.match(/Windows Phone/i)
  );
}

export default detectMobile;
