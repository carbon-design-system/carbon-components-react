export const keyCodes = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  PAGEUP: 33,
  PAGEDOWN: 34,
  END: 35,
  HOME: 36,
  // These correspond to arrow keys, often expressed as ArrowXyz in the `key`
  // field.
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

/**
 * Check to see if at least one key code matches the key code of the
 * given event.
 *
 * @param {Event} event
 * @param {Array<Number>} keyCodesToMatch
 * @returns {boolean}
 */
export function matches(event, keyCodesToMatch) {
  for (let i = 0; i < keyCodesToMatch.length; i++) {
    if (keyCodesToMatch[i] === event.keyCode) {
      return true;
    }
  }
  return false;
}
