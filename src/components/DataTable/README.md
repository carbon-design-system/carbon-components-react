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

### Behavior

#### Sorting

Sorting behavior is built into the `DataTable` component, all it takes is for a consumer to wire it up.

#### Selection and Batch Actions

#### Expansion

#### Filtering

#### Pagination
