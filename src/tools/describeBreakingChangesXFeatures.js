import { breakingChangesX } from '../internal/FeatureFlags';

export default (name, callback) => {
  if (!breakingChangesX) {
    describe(name, callback);
  } else {
    describe(name, () => {
      it('dummy', () => {});
    });
  }
};
