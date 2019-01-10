import { defaultTheme } from './ThemeContext';

export default {
  ...defaultTheme,
  tokens: { ...defaultTheme.tokens, support04: 'rebeccapurple' },
};
