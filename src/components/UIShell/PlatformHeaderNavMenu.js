import React from 'react';
import { ChevronDownGlyph } from '@carbon/icons-react';

const PlatformHeaderNavMenuItem = ({ title }) => {
  return (
    <li className="bx--platform-header__dropdown-item">
      {title}
      <ChevronDownGlyph className="bx--platform-header__arrow" />
      <ul className="bx--dropdown-item__menu" role="menubar" aria-label={title}>
        <li class="bx--dropdown-item__menu-item">
          <a href="#">Link 1</a>
        </li>
        <li class="bx--dropdown-item__menu-item">
          <a href="#">Link 2</a>
        </li>
        <li class="bx--dropdown-item__menu-item">
          <a href="#">Link 3</a>
        </li>
      </ul>
    </li>
  );
};

export default PlatformHeaderNavMenuItem;
