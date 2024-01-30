import { Extension as t } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { v4 } from 'uuid';
const s = ({ getId: t, anchorTypes: s = ['heading'] }) =>
    new Plugin({
      key: new PluginKey('toc'),
      appendTransaction(trans, _state, newState) {
        const d = newState.tr;
        let l = !1;
        if (trans.some((t) => t.docChanged)) {
          const tmp = [];
          newState.doc.descendants((node, i) => {
            const r = node.attrs['data-toc-id'];
            if (s.includes(node.type.name)) {
              if (null == r || tmp.includes(r)) {
                let o = '';
                (o = t ? t(node.textContent) : v4()),
                  d.setNodeMarkup(i, void 0, {
                    ...node.attrs,
                    'data-toc-id': o,
                    id: o,
                  }),
                  (l = !0);
              }
              tmp.push(r);
            }
          });
        }
        return l ? d : null;
      },
    }),
  getLastHeadingOnLevel = (t, e) => {
    let o = t.filter((t) => t.level === e).pop();
    if (0 !== e) return o || (o = getLastHeadingOnLevel(t, e - 1)), o;
  },
  getHeadlineLevel = (t, e) => {
    let o = 1;
    const n = e.at(-1),
      s = [...e].reverse().find((e) => e.originalLevel <= t.node.attrs.level),
      i = (null == s ? void 0 : s.level) || 1;
    return (
      (o =
        t.node.attrs.level > ((null == n ? void 0 : n.originalLevel) || 1)
          ? ((null == n ? void 0 : n.level) || 1) + 1
          : t.node.attrs.level < ((null == n ? void 0 : n.originalLevel) || 1)
            ? i
            : (null == n ? void 0 : n.level) || 1),
      o
    );
  },
  l = (t, e) => {
    const o = e.at(-1);
    return o ? ((null == o ? void 0 : o.itemIndex) || 1) + 1 : 1;
  },
  getHierarchicalIndexes = (t, e, o) => {
    let n, s;
    const i = o || t.node.attrs.level || 1;
    let d = 1;
    const l = e.filter((t) => t.level <= i);
    return (
      (d =
        (null === (n = l.at(-1)) || void 0 === n ? void 0 : n.level) === i
          ? ((null === (s = l.at(-1)) || void 0 === s ? void 0 : s.itemIndex) ||
              1) + 1
          : 1),
      d
    );
  },
  a = (t, e) => {
    const { editor: o } = e,
      n = [],
      s = [];
    let i = null;
    if (
      (o.state.doc.descendants((t, o) => {
        t.type.name === (e.anchorTypes || 'heading') &&
          n.push({ node: t, pos: o });
      }),
      n.forEach((t) => {
        const n = o.view.domAtPos(t.pos + 1).node;
        e.storage.scrollPosition >= n.offsetTop &&
          ((i = t.node.attrs['data-toc-id']),
          s.push(t.node.attrs['data-toc-id']));
      }),
      (t = t.map((t) => ({
        ...t,
        isActive: t.id === i,
        isScrolledOver: s.includes(t.id),
      }))),
      e.onUpdate)
    ) {
      const o = 0 === e.storage.content.length;
      e.onUpdate(t, o);
    }
    return t;
  },
  c = (t) => {
    const { editor: e, onUpdate } = t,
      n = [];
    let s = [];
    const i = [];
    if (
      (e.state.doc.descendants((e, o) => {
        let s;
        (null === (s = t.anchorTypes) || void 0 === s
          ? void 0
          : s.includes(e.type.name)) && n.push({ node: e, pos: o });
      }),
      n.forEach((o, d) => {
        const l = e.view.domAtPos(o.pos + 1).node,
          r = t.storage.scrollPosition >= l.offsetTop;
        i.push(l);
        const a = o.node.attrs.level,
          c = n[d - 1],
          p = t.getLevelFn(o, s),
          h = t.getIndexFn(o, s, p);
        s = c
          ? [
              ...s,
              {
                itemIndex: h,
                id: o.node.attrs['data-toc-id'],
                originalLevel: a,
                level: p,
                textContent: o.node.textContent,
                pos: o.pos,
                editor: e,
                isActive: !1,
                isScrolledOver: !1,
                node: o.node,
                dom: l,
              },
            ]
          : [
              ...s,
              {
                itemIndex: h,
                id: o.node.attrs['data-toc-id'],
                originalLevel: a,
                level: p,
                textContent: o.node.textContent,
                pos: o.pos,
                editor: e,
                isActive: !1,
                isScrolledOver: r,
                node: o.node,
                dom: l,
              },
            ];
      }),
      (s = a(s, t)),
      onUpdate)
    ) {
      const e = 0 === t.storage.content.length;
      onUpdate(s, e);
    }
    (t.storage.anchors = i),
      (t.storage.content = s),
      e.state.tr.setMeta('toc', s),
      e.view.dispatch(e.state.tr);
  },
  p = t.create({
    name: 'toc',
    addStorage: () => ({
      content: [],
      anchors: [],
      scrollHandler: () => null,
      scrollPosition: 0,
    }),
    addGlobalAttributes() {
      return [
        {
          types: this.options.anchorTypes || ['headline'],
          attributes: {
            id: {
              default: null,
              renderHTML: (t) => ({ id: t.id }),
              parseHTML: (t) => t.id || null,
            },
            'data-toc-id': {
              default: null,
              renderHTML: (t) => ({ 'data-toc-id': t['data-toc-id'] }),
              parseHTML: (t) => t.dataset.tocId || null,
            },
          },
        },
      ];
    },
    addOptions: () => ({
      onUpdate: () => {},
      getId: (t) => v4(),
      scrollParent: ('undefined' != typeof window && window) || void 0,
      anchorTypes: ['heading'],
    }),
    onUpdate() {
      let t;
      c({
        editor: this.editor,
        storage: this.storage,
        onUpdate:
          null === (t = this.options.onUpdate) || void 0 === t
            ? void 0
            : t.bind(this),
        getIndexFn: this.options.getIndex || l,
        getLevelFn: this.options.getLevel || d,
        anchorTypes: this.options.anchorTypes,
      });
    },
    onCreate() {
      let t;
      const { tr: o } = this.editor.state,
        n = [];
      this.editor.state.doc.descendants((t, s) => {
        let i;
        const d = t.attrs['data-toc-id'];
        if (
          null === (i = this.options.anchorTypes) || void 0 === i
            ? void 0
            : i.includes(t.type.name)
        ) {
          if (null == d || n.includes(d)) {
            let n = '';
            (n = this.options.getId ? this.options.getId(t.textContent) : v4()),
              o.setNodeMarkup(s, void 0, {
                ...t.attrs,
                'data-toc-id': n,
                id: n,
              });
          }
          n.push(d);
        }
      }),
        this.editor.view.dispatch(o),
        c({
          editor: this.editor,
          storage: this.storage,
          onUpdate:
            null === (t = this.options.onUpdate) || void 0 === t
              ? void 0
              : t.bind(this),
          getIndexFn: this.options.getIndex || l,
          getLevelFn: this.options.getLevel || d,
          anchorTypes: this.options.anchorTypes,
        }),
        (this.storage.scrollHandler = () => {
          let t, e;
          const o =
            this.options.scrollParent instanceof HTMLElement
              ? this.options.scrollParent.scrollTop
              : null === (t = this.options.scrollParent) || void 0 === t
                ? void 0
                : t.scrollY;
          this.storage.scrollPosition = o || 0;
          const n = a(this.storage.content, {
            editor: this.editor,
            anchorTypes: this.options.anchorTypes,
            storage: this.storage,
            onUpdate:
              null === (e = this.options.onUpdate) || void 0 === e
                ? void 0
                : e.bind(this),
          });
          this.storage.content = n;
        }),
        this.options.scrollParent &&
          this.options.scrollParent.addEventListener(
            'scroll',
            this.storage.scrollHandler,
          );
    },
    onDestroy() {
      this.options.scrollParent &&
        this.options.scrollParent.removeEventListener(
          'scroll',
          this.storage.scrollHandler,
        );
    },
    addProseMirrorPlugins() {
      return [
        s({ getId: this.options.getId, anchorTypes: this.options.anchorTypes }),
      ];
    },
  });
export {
  p as default,
  d as getHeadlineLevel,
  r as getHierarchicalIndexes,
  i as getLastHeadingOnLevel,
  l as getLinearIndexes,
  p as TableOfContents,
  s as TableOfContentsPlugin,
};
