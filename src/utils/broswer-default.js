export function stopPropagation(ev) {
  ev.stopPropagation();
  ev.cancelBubble = true
}

export function preventDefault(ev) {
  ev.preventDefault()
}

export function stopDefault(ev) {
  stopPropagation(ev);
  preventDefault(ev)
}
