import * as Carbon from '../../index';

describe('All components have a display name', () => {
  for (const Component in Carbon) {
    it(`${Component} has a display name`, () => {
      expect(Carbon[Component].displayName).not.toBeUndefined();
    });
  }
});
