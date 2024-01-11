import styles from './MultipleDragPreview.module.css';
import { PolymorphicIcon } from './PolymorphicIcon';

export const MultipleDragPreview = (props) => {
  return (
    <div className={styles.root} data-testid="custom-drag-preview">
      {props.dragSources.map((node) => (
        <div key={''} className={styles.item}>
          <div className={styles.icon}>
            <PolymorphicIcon type={node?.data?.fileType} />
          </div>
          <div className={styles.label}>{node.text}</div>
        </div>
      ))}
    </div>
  );
};
