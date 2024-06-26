import './ToC.css';

import { NodeViewWrapper, useEditor } from '@tiptap/react';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';

interface Headings {
  level: number;
  text: string;
  id: string;
}

export const ToC: FC = function () {
  const editor = useEditor();
  const [items, setItems] = useState<Headings[]>([]);

  const handleUpdate = useCallback(() => {
    const headings: Headings[] = [];

    if (!editor) return;
    const tr = editor.state.tr;

    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'heading') {
        const id = `heading-${headings.length + 1}`;

        if (node.attrs.id !== id) {
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            id,
          });
        }

        headings.push({
          level: node.attrs.level,
          text: node.textContent,
          id,
        });
      }
    });

    tr.setMeta('addToHistory', false);
    tr.setMeta('preventUpdate', true);

    editor.view.dispatch(tr);

    setItems(headings);
  }, [editor]);

  useEffect(handleUpdate, []);

  useEffect(() => {
    if (!editor) return;

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor]);

  return (
    <NodeViewWrapper className="toc">
      <ul className="toc__list">
        {items.map((item, index) => (
          <li key={index} className={`toc__item toc__item--${item.level}`}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </NodeViewWrapper>
  );
};
