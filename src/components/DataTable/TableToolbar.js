import wrapComponent from '../../tools/wrapComponent';

const TableToolbar = wrapComponent({
  name: 'TableToolbar',
  type: 'section',
  className: prefix => [`${prefix}--table-toolbar`],
});

export default TableToolbar;
