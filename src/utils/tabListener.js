/**
 *
 * tabListener
 *
 */

export function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
    document.body.classList.add('user-is-tabbing');
    window.postMessage({ userIsTabbing: true }, window.location.origin);
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
}

export function handleMouseDownOnce() {
  document.body.classList.remove('user-is-tabbing');
  window.postMessage({ userIsTabbing: false }, window.location.origin);
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
}

window.addEventListener('keydown', handleFirstTab);
