export function stopPropagation(e) {
  e.stopPropagation();
  e.cancelBubble = true;
}

export function preventDefault(ev) {
  ev.preventDefault();
}

export function stopDefault(ev) {
  stopPropagation(ev);
  preventDefault(ev);
}

export function screenSize() {
  return typeof window !== 'undefined' ? { width: window.screen.width, height: window.screen.height }
    : { width: 0, height: 0 };
}

export function browserAvailSize() {
  return typeof window !== 'undefined' ? {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  } : { width: 0, height: 0 };
}

export function getScroll() {
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = document.compatMode === 'CSS1Compat';

  const scroll = { left: 0, top: 0 };
  if (supportPageOffset) {
    scroll.left = window.pageXOffset;
    scroll.top = window.pageYOffset;
  } else if (isCSS1Compat) {
    scroll.left = document.documentElement.scrollLeft;
    scroll.top = document.documentElement.scrollTop;
  } else {
    scroll.left = document.body.scrollLeft;
    scroll.top = document.body.scrollTop;
  }
  return scroll;
}
