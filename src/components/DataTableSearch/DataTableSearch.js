import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Search from '../Search';

const DataTableSearch = props => {
  const { className, searchContainerClass, ...other } = props;

  const searchContainerClasses = classNames(searchContainerClass, 'bx--toolbar-search-container');

  return (
    <div className={searchContainerClasses}>
      <Search className={className} {...other} small id="search-2" labelText="Filter table" placeHolderText="Search" />
    </div>
  )
}

DataTableSearch.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  searchContainerClasses: PropTypes.string,
}

export default DataTableSearch;
