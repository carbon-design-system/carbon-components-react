const RHL_PREFIX = '__reactstandin__getCurrent';

const getProxyOrType = c => {
  const isProxy = c && typeof c !== 'string' && Reflect.has(c, RHL_PREFIX);
  return isProxy ? c[RHL_PREFIX]() : c;
};

const areComponentsEqual = (a, b) => {
  return getProxyOrType(a) === getProxyOrType(b);
};

export default areComponentsEqual;
