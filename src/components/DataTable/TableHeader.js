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
  /**
   * Specify whether this header is the header by which a table is being sorted
   * by
   */
  isSortHeader: PropTypes.bool,
  /**
   * Hook that is invoked when the header is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify which direction we are currently sorting by, should be one of DESC,
   * NONE, or ASC.
   */
  sortDirection: PropTypes.oneOf(Object.values(sortStates)),

  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are avabile on the `translationKeys` field for
   * this component.
   */
  translateWithId: PropTypes.func,
};

TableHeader.defaultProps = {
  translateWithId,
};

TableHeader.translationKeys = Object.keys(translationKeys);

export default TableHeader;
