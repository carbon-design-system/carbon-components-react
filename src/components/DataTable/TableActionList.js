import wrapComponent from '../../tools/wrapComponent';

const TableActionList = wrapComponent({
  name: 'TableActionList',
  type: 'div',
  className: prefix => [`${prefix}--action-list`],
});

export default TableActionList;
