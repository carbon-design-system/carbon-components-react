# `DataTable` component

## Usage

You can include `DataTable` and its components by doing the following in your project:

```js
import { DataTable } from 'carbon-components-react';
```

The default export for `DataTable` also includes properties for all the `Table*` components that you will also want to use in your application. You can access them by doing either of the following:

```js
import { DataTable } from 'carbon-components-react';
// De-structure `DataTable` directly to get local references
const { Table, TableHead, TableHeader, TableBody, TableCell } = DataTable;

// Or, just use them in your React projects by doing
<DataTable.Table />
<DataTable.TableHead />
<DataTable.TableHeader />
// ...
```

The `DataTable` component itself follows the `render` prop pattern, meaning that in order to render something to the screen you'll have to provide a `render` function to the `DataTable` component. In practice, this looks like the following:

```js
import { DataTable } from 'carbon-components-react';
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} = DataTable;

// Inside of your component's `render` method
<DataTable
  rows={rows}
  headers={headers}
  render={({ rows, headers }) => (
    <TableContainer title="Example">
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableHeader key={header.key}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {row.cells.map(cell => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTable.TableContainer>
  )}
/>
```

In the example above, we can see that the `render` prop is just a function that has two arguments, `rows` and `headers`, and just returns the Table markup that we want.

For a full list of what is available in this `render` prop, check out (TODO ADD LINK).

### Behavior

#### Sorting

Sorting behavior is built into the `DataTable` component, all it takes is for a consumer to wire it up.

##### Programmatic sorting

#### Selection and Batch Actions

#### Expansion

#### Filtering

#### Pagination
