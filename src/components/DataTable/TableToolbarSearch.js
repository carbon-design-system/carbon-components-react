import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Search from '../Search';
import setupGetInstanceId from './tools/instanceId';

const getInstanceId = setupGetInstanceId();

const TableToolbarSearch = ({
  className,
  searchContainerClass,
  onChange,
  id = `data-table-search-${getInstanceId()}`,
  placeHolderText,
  labelText,
  ...rest
}) => {
  const searchContainerClasses = cx(
    searchContainerClass,
    'bx--toolbar-search-container'
  );
  return (
    <div className={searchContainerClasses}>
      <Search
        light
        className={className}
        {...rest}
        small
        id={id}
        labelText={labelText || 'Filter table'}
        placeHolderText={placeHolderText || 'Search'}
        onChange={onChange}
      />
    </div>
  );
};

TableToolbarSearch.propTypes = {
  children: PropTypes.node,

  /**
   * Provide an optional class name for the search container
   */
  className: PropTypes.string,

  /**
   * Provide an optional id for the search container
   */
  id: PropTypes.string,

  /**
   * Provide an optional className for the overal container of the Search
   */
  searchContainerClasses: PropTypes.string,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide custom text for the searchbar's placeholder
   */
  placeHolderText: PropTypes.string,

  /**
   * Provide custom text for the searchbar's label
   */
  labelText: PropTypes.string,
};

TableToolbarSearch.defaultProps = {};

export default TableToolbarSearch;
