import wrapComponent from '../../tools/wrapComponent';
import styles from '../../../.storybook/_container.scss';

const TableToolbar = wrapComponent({
  name: 'TableToolbar',
  type: 'section',
  className: [styles['bx--table-toolbar']],
});

export default TableToolbar;
