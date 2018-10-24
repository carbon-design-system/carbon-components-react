/**
 * @jest-environment jsdom
 */
import { keyCodes, matches } from '../keyCode';

// Used for the case of not matching
const EQUAL_SIGN_KEY_CODE = 187;

describe('keyCodes', () => {
  describe('matches', () => {
    let inputNode;
    let eventListener;

    beforeEach(() => {
      inputNode = document.createElement('input');
      inputNode.setAttribute('type', 'text');

      eventListener = jest.fn();
      inputNode.addEventListener('keydown', eventListener);

      document.body.appendChild(inputNode);
    });

    afterEach(() => {
      inputNode.removeEventListener('keydown', eventListener);
      inputNode.parentNode.removeChild(inputNode);
    });

    it.each(Object.keys(keyCodes))('should match when using %s', key => {
      const eventToMatch = new KeyboardEvent('keydown', {
        keyCode: keyCodes[key],
      });
      inputNode.dispatchEvent(eventToMatch);
      expect(matches(eventListener.mock.calls[0][0], [keyCodes[key]])).toBe(
        true
      );
    });

    it('should not match if no key code provided matches the event', () => {
      const eventToNotMatch = new KeyboardEvent('keydown', {
        keyCode: EQUAL_SIGN_KEY_CODE,
      });
      inputNode.dispatchEvent(eventToNotMatch);
      expect(
        matches(eventListener.mock.calls[0][0], [keyCodes.ENTER, keyCodes.UP])
      ).toBe(false);
    });

    it('should match the first valid key code given', () => {
      const eventToMatch = new KeyboardEvent('keydown', {
        keyCode: keyCodes.UP,
      });
      inputNode.dispatchEvent(eventToMatch);
      expect(
        matches(eventListener.mock.calls[0][0], [keyCodes.ENTER, keyCodes.UP])
      ).toBe(true);
    });
  });
});
