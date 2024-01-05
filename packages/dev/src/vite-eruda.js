export function eruda({ debug } = { debug: undefined }) {
  return {
    name: 'vite-eruda',
    transformIndexHtml(html) {
      const tags = [
        {
          tag: 'script',
          attrs: {
            src: 'https://cdn.jsdelivr.net/npm/eruda',
            type: 'text/javascript',
          },
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: 'eruda.init();',
          injectTo: 'head',
        },
      ];
      if (debug === true) {
        return {
          html,
          tags,
        };
      } else if (debug === false) {
        return html;
      }
      // eslint-disable-next-line no-undef
      if (process.env.NODE_ENV !== 'production') {
        return {
          html,
          tags,
        };
      } else {
        return html;
      }
    },
  };
}
