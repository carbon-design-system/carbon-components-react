import { createContext } from 'react';
import { tokens } from '@carbon/colors';
import { spacing } from '@carbon/layout';

export const defaultTheme = { tokens, spacing };

const ThemeContext = createContext(defaultTheme);

export default ThemeContext;
