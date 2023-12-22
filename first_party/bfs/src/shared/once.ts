export function once(fn) {
  let called, value;

  if (typeof fn !== 'function') {
    throw new Error('expected a function but got ' + fn);
  }

  return function () {
    if (called) {
      return value;
    }
    called = true;
    value = fn.apply(this, arguments);
    fn = undefined;
    return value;
  };
}
