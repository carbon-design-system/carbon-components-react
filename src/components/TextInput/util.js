const invalidProps = ({ invalid, errorId }) => ({
  'data-invalid': invalid,
  'aria-invalid': invalid,
  'aria-describedby': errorId,
});

export const textInputProps = ({ invalid, sharedTextInputProps, errorId }) => ({
  ...sharedTextInputProps,
  ...(invalid ? invalidProps({ invalid, errorId }) : {}),
});

export const togglePasswordVisibilityIconProps = ({
  passwordIsVisible,
  alt,
  hidePasswordText = 'Hide',
  showPasswordText = 'Show',
}) => ({
  alt:
    alt ||
    `${passwordIsVisible ? hidePasswordText : showPasswordText} password`,
  name: `visibility-${passwordIsVisible ? 'off' : 'on'}`,
  description: `${
    passwordIsVisible ? hidePasswordText : showPasswordText
  } password`,
});
