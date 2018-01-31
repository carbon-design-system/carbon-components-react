import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Search from '../Search';

const TableSearch = ({
  className,
  searchContainerClass,
  onChange,
  ...rest
}) => {
  const searchContainerClasses = cx(
    searchContainerClass,
    'bx--toolbar-search-container'
  );

  return (
    <div className={searchContainerClasses}>
      <Search
        className={className}
        {...rest}
        small
        id="search-2"
        labelText="Filter table"
        placeHolderText="Search"
        onChange={onChange}
      />
    </div>
  );
};

TableSearch.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  searchContainerClasses: PropTypes.string,
  onChange: PropTypes.func,
};

export default TableSearch;
