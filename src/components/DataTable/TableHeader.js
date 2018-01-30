import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import { sortStates } from './tools/sorting';

const translationKeys = {
  'carbon.table-header.icon.description': 'Sort arrow',
};

const translateWithId = key => translationKeys[key];

const TableHeader = ({
  className: headerClassName,
  children,
  onClick,
  translateWithId: t,
  ...rest
}) => {
  const className = cx(headerClassName, {
    'bx--table-sort-v2': true,
    'bx--table-sort-v2--active': false,
    'bx--table-sort-v2--ascending': false,
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
  children: PropTypes.node,
  onClick: PropTypes.func,
  sortDirection: PropTypes.oneOf(Object.values(sortStates)),
  translateWithId: PropTypes.func,
};

TableHeader.defaultProps = {
  translateWithId,
};

TableHeader.translationKeys = Object.keys(translationKeys);

export default TableHeader;
