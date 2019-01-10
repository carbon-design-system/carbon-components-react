import { useContext } from 'react';
import ThemeContext from '../themes/ThemeContext';
import { Button } from 'carbon-components-react';

const ThemedButton = () => {
  const { tokens, spacing } = useContext(ThemeContext);
  return (
    <Button style={{ background: tokens.support04, margin: spacing[4] }}>
      Themed Button
    </Button>
  );
};

export default ThemedButton;
