const RHL_PREFIX = '__reactstandin__getCurrent';

const getProxyOrType = c => {
  const isProxy =
    c &&
    (Object.prototype.hasOwnProperty.call(c, RHL_PREFIX) ||
      Object.prototype.hasOwnProperty.call(c.__proto__, RHL_PREFIX));
  return isProxy ? c[RHL_PREFIX]() : c;
};

const areComponentsEqual = (a, b) => {
  return getProxyOrType(a) === getProxyOrType(b);
};

export default areComponentsEqual;
