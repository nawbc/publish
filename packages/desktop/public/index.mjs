(function () {
  'use strict';

  const a = window.message;
  function i(e, t) {
    window.addEventListener('message', (n) => {
      if (n.data) {
        const s = n.data;
        s.event === e && t && t(new CustomEvent(e, { detail: s.detail }));
      }
    });
  }
  function o(e, t, n) {
    if (window.top)
      (n = Object.assign({}, { targetOrigin: '*' }, n)),
        window.top.postMessage(a(e, t), n);
    else throw new Error('Can not send message');
  }
  ({ addEventListener: i, postMessage: o }).addEventListener(
    'manifest',
    (e) => {
      console.log(e);
    },
  );
})();
