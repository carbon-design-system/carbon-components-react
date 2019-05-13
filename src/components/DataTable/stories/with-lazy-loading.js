/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import {
  LazyDataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '../../DataTable';
import { initialRows, headers } from './shared';

export default () => {
  class LazyDataTableStory extends Component {
    state = { data: initialRows, page: 1, pageSize: 1, direction: 'DESC' };

    objectSort = (key, order, locale = 'en', getFn = x => x) => (a, b) => {
      if (order === 'DESC') {
        return this.compare(getFn(b[key]), getFn(a[key]), locale);
      }
      return this.compare(getFn(a[key]), getFn(b[key]), locale);
    };

    compare = (a, b, locale = 'en') => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }

      if (typeof a === 'string' && typeof b === 'string') {
        return this.compareStrings(a, b, locale);
      }

      return this.compareStrings(`${a}`, `${b}`, locale);
    };

    compareStrings = (a, b, locale = 'en') =>
      a.localeCompare(b, locale, { numeric: true });

    onHeaderClick = ({ key, direction }) => {
      this.setState({
        data: initialRows.sort(this.objectSort(key, direction)),
      });
    };

    onPageChange = ({ page, pageSize }) => {
      this.setState({ page, pageSize });
    };

    getData = () => {
      return this.state.data.slice(
        (this.state.page - 1) * this.state.pageSize,
        (this.state.page - 1) * this.state.pageSize + this.state.pageSize
      );
    };

    render() {
      return (
        <LazyDataTable
          rows={this.getData()}
          headers={headers}
          onPageChange={this.onPageChange}
          onHeaderClick={this.onHeaderClick}
          pagination={{
            pageSize: 1,
            pageSizes: [1, 2, 3],
            totalItems: initialRows.length,
          }}
          render={({ rows, headers, getHeaderProps, getRowProps }) => (
            <TableContainer title="Lazy loading of data">
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
      );
    }
  }
  return <LazyDataTableStory />;
};
