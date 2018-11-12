import React from 'react';
import Button from '../Button';

const DangerButton = props => <Button kind="danger" {...props} />;

DangerButton.displayName = 'DangerButton';

export default DangerButton;
