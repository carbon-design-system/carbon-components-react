import React from 'react';
import { Provider } from 'react-redux';
import {
  TableBatchAction,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableBatchEditActions,
  TableBatchEditable,
  TableBatchEditableContainer,
  TableBatchEditDeleteHeader,
} from '../../DataTable';
import { iconAddOutline, iconEdit } from 'carbon-icons';

import store from './store/store';
import ExampleRuleEditTableContainer from './store/Container';
import ExampleRuleReadCell from './components/ExampleRuleReadCell';
import ExampleRuleEditCell from './components/ExampleRuleEditCell';

const headersBatchEdit = [
  {
    key: 'protocol',
    header: 'Protocol',
    items: [
      {
        id: 'tcp',
        label: 'TCP',
      },
      {
        id: 'udp',
        label: 'UDP',
      },
      {
        id: 'icmp',
        label: 'ICMP',
      },
      {
        id: 'all',
        label: 'All',
      },
    ],
  },
  {
    key: 'source',
    header: 'Source',
    typeItems: [
      {
        id: 'any',
        label: 'Any',
      },
      {
        id: 'ip_address',
        label: 'IP address',
      },
      {
        id: 'cidr_block',
        label: 'CIDR block',
      },
      {
        id: 'security_group',
        label: 'Security group',
      },
    ],
    securityGroupItems: [
      {
        id: 'magni_a_tenetur',
        label: 'Magni a tenetur',
      },
      {
        id: 'quia_neque',
        label: 'Quia neque',
      },
      {
        id: 'eaque_est',
        label: 'Eaque est',
      },
      {
        id: 'omnis_voluptas',
        label: 'Omnis voluptas',
      },
    ],
  },
  {
    key: 'port_range',
    header: 'Port range',
    typeItems: [
      {
        id: 'any',
        label: 'Any',
      },
      {
        id: 'limit',
        label: 'Limit',
      },
    ],
  },
  {
    key: 'delete',
    header: '',
  },
];

export default () => (
  <Provider store={store}>
    <ExampleRuleEditTableContainer
      headers={headersBatchEdit}
      render={({
        rows,
        headers,
        getHeaderProps,
        editing,
        saving,
        saved,
        shouldDisableSave,
        onCancelEdit,
        onRequestSave,
        onChangeCell,
        onAddRule,
        onSetEditMode,
        onDeleteRule,
      }) => {
        return (
          <TableBatchEditableContainer
            title="DataTable with batch actions"
            editing={editing}>
            <TableToolbar>
              <TableBatchEditActions
                shouldShowBatchActions={editing}
                shouldDisableSave={shouldDisableSave}
                saving={saving}
                saved={saved}
                onCancel={onCancelEdit}
                onSave={onRequestSave}>
                <TableBatchAction icon={iconAddOutline} onClick={onAddRule}>
                  Add rule
                </TableBatchAction>
              </TableBatchEditActions>
              <TableToolbarContent>
                <TableToolbarAction
                  icon={iconEdit}
                  iconDescription="Edit"
                  onClick={onSetEditMode}
                />
              </TableToolbarContent>
            </TableToolbar>
            <TableBatchEditable saving={editing && saving}>
              <TableHead>
                <TableRow>
                  {headers.map(header => {
                    const Header =
                      header.key !== 'delete'
                        ? TableHeader
                        : TableBatchEditDeleteHeader;
                    return (
                      <Header
                        {...getHeaderProps({ header })}
                        isSortable={false}
                        colSpan={{ port_range: 3, source: 2 }[header.key] || 1}>
                        {header.header}
                      </Header>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    {row.cells.map((cell, i) => {
                      const {
                        key,
                        items,
                        typeItems,
                        securityGroupItems,
                      } = headers[i];
                      const { id, value } = cell;
                      return !editing ? (
                        <ExampleRuleReadCell
                          cellType={key}
                          key={`${row.id}-${key}`}
                          value={value}
                          items={items}
                          typeItems={typeItems}
                          securityGroupItems={securityGroupItems}
                        />
                      ) : (
                        <ExampleRuleEditCell
                          id={id}
                          cellType={key}
                          key={`${row.id}-${key}`}
                          value={value}
                          items={items}
                          typeItems={typeItems}
                          securityGroupItems={securityGroupItems}
                          onChange={onChangeCell}
                          onDelete={onDeleteRule}
                        />
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </TableBatchEditable>
          </TableBatchEditableContainer>
        );
      }}
    />
  </Provider>
);
