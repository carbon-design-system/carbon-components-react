import wrapComponent from '../../tools/wrapComponent';
import styles from '../../../.storybook/_container.scss';

const TableActionList = wrapComponent({
  name: 'TableActionList',
  type: 'div',
  className: [styles['bx--action-list']],
});

export default TableActionList;
