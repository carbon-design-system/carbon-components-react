import wrapComponent from '../../tools/wrapComponent';

const TableToolbarContent = wrapComponent({
  name: 'TableToolbarContent',
  type: 'div',
  className: prefix => [`${prefix}--toolbar-content`],
});

export default TableToolbarContent;
