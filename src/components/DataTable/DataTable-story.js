import { storiesOf } from '@storybook/react';

const readmeURL = 'https://goo.gl/dq6CEK';

storiesOf('DataTable', module)
  .addWithInfo(
    'default',
    /* eslint-disable no-useless-escape */
    `
      Data Tables are used to represent a collection of resources, displaying a
      subset of their fields in columns, or headers. The \`DataTable\` component
      that we export from Carbon requires two props to be passed in: \`rows\`
      and \`headers\`.

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    require('./stories/default').default
  )
  .addWithInfo(
    'with toolbar',
    `
      DataTable with toolbar and filtering.

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    require('./stories/with-toolbar').default
  )
  .addWithInfo(
    'with sorting',
    `
      DataTable with sorting

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    require('./stories/with-sorting').default
  )
  .addWithInfo(
    'with selection',
    `
      DataTable with selection

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    require('./stories/with-selection').default
  )
  .addWithInfo(
    'with expansion',
    `
      DataTable with expansion

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    require('./stories/with-expansion').default
  )
  .addWithInfo(
    'with batch actions',
    `
      Uses <TableToolbar> alongside <TableBatchActions> and <TableBatchAction>
      to create the toolbar and placeholder for where the batch action menu will
      be displayed.

      You can use the \`getBatchActionProps\` prop getter on the
      <TableBatchActions> component to have it wire up the ghost menu for you.

      Individual <TableBatchAction> components take in any kind of event handler
      prop that you would expect to use, like \`onClick\`. You can use these
      alongside the \`selectedRows\` property in your \`render\` prop function
      to pass along this info to your batch action handler.

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    require('./stories/with-batch-actions').default
  )
  .addWithInfo(
    'with dynamic rows',
    `
      Showcases DataTable behavior when rows are added to the component
      dynamically.
    `,
    require('./stories/with-dynamic-rows').default
  )
  .addWithInfo(
    'with inline cell edit',
    `
    TODO
    `,
    require('./stories/with-inline-cell-edit').default
  );
