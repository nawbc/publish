import { NodeViewWrapper } from '@tiptap/react';
import { SuggestionProps } from '@tiptap/suggestion';
import { FC, useCallback, useEffect } from 'react';

export interface SlashCommandsProps extends SuggestionProps {}

export const SlashMenu: FC<SlashCommandsProps> = (props) => {
  console.log(props);
  const { editor, items, command } = props;

  const handleUpdate = useCallback(() => {
    const headings = [];
    // const transaction = editor.state.tr;

    // editor.state.doc.descendants((node, pos) => {
    //   if (node.type.name === 'heading') {
    //     const id = `heading-${headings.length + 1}`;

    //     if (node.attrs.id !== id) {
    //       transaction.setNodeMarkup(pos, undefined, {
    //         ...node.attrs,
    //         id,
    //       });
    //     }
    //   }
    // });

    // transaction.setMeta('addToHistory', false);
    // transaction.setMeta('preventUpdate', true);

    // editor.view.dispatch(transaction);

    // setItems(headings);
  }, [editor]);

  useEffect(handleUpdate, []);

  useEffect(() => {
    if (!editor) {
      return;
    }
    // editor.on('update', handleUpdate);
    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor]);

  console.log(items);

  return (
    <NodeViewWrapper className="publish-slash-commands-menu">
      <ul className="toc__list">
        {items.map((item: any, index) => (
          <li
            key={index}
            onClick={() => {
              command(item);
            }}
            className={`toc__item toc__item`}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </NodeViewWrapper>
  );
};
