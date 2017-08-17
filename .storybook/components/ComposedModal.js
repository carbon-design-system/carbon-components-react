import React from 'react';
import { storiesOf, action } from '@storybook/react';
import ComposedModal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../../components/ComposedModal';
import Button from '../../components/Button';

const modalProps = {
  onBlur: action('onBlur'),
  onClick: action('onClick'),
  onFocus: action('onFocus'),
  className: 'some-class',
};

storiesOf('ComposedModal', module)
  .addWithInfo(
    'Using Header / Footer Props',
    `
    Composed Modal allows you to create your own modal with just the parts you need. The Modal Header and Modal Footer props come with some built in functionality you can use if you choose
  `,
    () =>
      <ComposedModal open>
        <ModalHeader label="Optional Label" title="Example" />
        <ModalBody>
          <p className="bx--modal-content__text">
            Please see ModalWrapper for more examples and demo of the
            functionality.
          </p>
        </ModalBody>
        <ModalFooter primaryButtonText="save" secondaryButtonText="cancel" />
      </ComposedModal>
  )
  .addWithInfo(
    'Using child nodes',
    `
    Alternatively, you can just use the Modal components as wrapper elements and figure the children out yourself. We do suggest for the header you utilize the built in props for label and title though
  `,
    () =>
      <ComposedModal open>
        <ModalHeader>
          <h1>Testing</h1>
        </ModalHeader>
        <ModalBody>
          <p className="bx--modal-content__text">
            Please see ModalWrapper for more examples and demo of the
            functionality.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button kind="secondary">Cancel</Button>
          <Button kind="primary">Save</Button>
        </ModalFooter>
      </ComposedModal>
  );
