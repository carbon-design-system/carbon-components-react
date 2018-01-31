import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import { sortStates } from './state/sorting';

const translationKeys = {
  'carbon.table-header.icon.description': 'Sort arrow',
};

const translateWithId = key => translationKeys[key];

const TableHeader = ({
  className: headerClassName,
  children,
  onClick,
  translateWithId: t,
  isSortHeader,
  sortDirection,
  ...rest
}) => {
  const className = cx(headerClassName, {
    'bx--table-sort-v2': true,
    'bx--table-sort-v2--active':
      isSortHeader && sortDirection !== sortStates.NONE,
    'bx--table-sort-v2--ascending':
      isSortHeader && sortDirection === sortStates.ASC,
  });
  return (
    <th>
      <button className={className} onClick={onClick} {...rest}>
        <span className="bx--table-header-label">{children}</span>
        <Icon
          className="bx--table-sort-v2__icon"
          name="caret--down"
          description={t('carbon.table-header.icon.description')}
        />
      </button>
    </th>
  );
};

TableHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isSortHeader: PropTypes.bool,
  onClick: PropTypes.func,
  sortDirection: PropTypes.oneOf(Object.values(sortStates)),
  translateWithId: PropTypes.func,
};

TableHeader.defaultProps = {
  translateWithId,
};

TableHeader.translationKeys = Object.keys(translationKeys);

export default TableHeader;
