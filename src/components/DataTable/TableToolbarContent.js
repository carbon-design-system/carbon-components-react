import wrapComponent from '../../tools/wrapComponent';
import styles from '../../../.storybook/_container.scss';

const TableToolbarContent = wrapComponent({
  name: 'TableToolbarContent',
  type: 'div',
  className: [styles['bx--toolbar-content']],
});

export default TableToolbarContent;
