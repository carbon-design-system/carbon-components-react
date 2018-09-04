/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  array,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import FileUploaderV2, { FileUploaderButtonV2 } from '../FileUploaderV2';
import FileUploaderSkeletonV2 from '../FileUploaderV2/FileUploaderV2.Skeleton';
import Button from '../Button';
import uid from '../../tools/uniqueId';

const coinToss = () => Math.round(Math.random());
fetchMock.mock({
  method: 'POST',
  matcher: 'https://jsonplaceholder.typicode.com/posts/',
  response: () =>
    new Promise((resolve, reject) =>
      setTimeout(() => (coinToss() ? resolve('200') : reject(500)), 500)
    ),
});

const buttonKinds = {
  primary: 'Primary (primary)',
  secondary: 'Secondary (secondary)',
  danger: 'Danger (danger)',
  ghost: 'Ghost (ghost)',
  'danger--primary': 'Danger Primary (danger--primary)',
  tertiary: 'Tertiary (tertiary)',
};
const props = {
  FileUploaderButtonV2: () => {
    const buttonKind = select('Button kind (buttonKind)', buttonKinds, '');
    return {
      labelText: text('Label text (labelText)', 'Add files'),
      name: text('Form item name: (name)', ''),
      multiple: boolean('Supports multiple files (multiple)', true),
      buttonKind: buttonKind || 'primary',
      role: text('ARIA role of the button (role)', ''),
      tabIndex: number('Tab index (tabIndex)', -1),
    };
  },
  FileUploaderV2: () => {
    const buttonKind = select('Button kind (buttonKind)', buttonKinds, '');
    return {
      labelTitle: text('The label title (labelTitle)', 'Upload'),
      labelDescription: text(
        'The label description (labelDescription)',
        'only .jpg or .png files at 500mb or less'
      ),
      buttonLabel: text('The button label (buttonLabel)', 'Add files'),
      buttonKind: buttonKind || 'primary',
      accept: array('Accepted file extensions (accept)', ['.jpg', '.png'], ','),
      multiple: boolean('Supports multiple files (multiple)', true),
    };
  },
};

class App extends React.Component {
  state = { files: [] };

  upload = ({ file }) =>
    fetch('https://jsonplaceholder.typicode.com/posts/', {
      method: 'POST',
      body: file,
    }).then(res => res.json());

  handleChange = ({ evt, multiple }) => {
    evt.stopPropagation();
    const files = multiple ? [...this.state.files] : [];
    [...evt.target.files].forEach(file => {
      const uuid = uid();
      files.push({
        uuid,
        name: file.name,
        size: file.size,
        status: 'uploading',
        iconDescription: 'Uploading',
      });
      const index = files.findIndex(file => file.uuid === uuid);
      this.upload({ file })
        .then(() => {
          fetchMock.restore();
          files[index].status = 'complete';
          files[index].iconDescription = 'Upload complete';
          this.setState({ files });
        })
        .catch(error => {
          files[index].status = 'edit';
          files[index].iconDescription = 'Upload failed';
          this.setState({ files });
          return new Error(error);
        });
    });
    this.setState({ files });
  };

  handleClick = ({ evt, index }) => {
    if (evt) {
      evt.stopPropagation();
    }
    const filteredArray = this.state.files.filter((file, i) => i !== index);
    this.setState({ files: filteredArray });
  };

  clearFiles = () => {
    this.setState({ files: [] });
  };

  render() {
    return (
      <div className="bx--file__container">
        <FileUploaderV2
          labelTitle="Upload"
          buttonLabel="Add files"
          name="file"
          multiple
          files={this.state.files}
          onChange={this.handleChange}
          onClick={this.handleClick}
          {...props.FileUploaderV2()}
        />
        <Button
          kind="secondary"
          small
          style={{ marginTop: '1rem' }}
          onClick={this.clearFiles}>
          Clear Files
        </Button>
      </div>
    );
  }
}

storiesOf('FileUploaderV2', module)
  .addDecorator(withKnobs)
  .add(
    'FileUploaderButton',
    withInfo({
      text:
        'The FileUploaderButton can be used as a standalone component if you do not need the extra UI that comes with FileUploader. The FileUploaderButton is used in FileUploader.',
    })(() => (
      <FileUploaderButtonV2
        labelText="Add files"
        className="bob"
        name="file"
        onChange={() => console.log('hi')}
        multiple
        {...props.FileUploaderButtonV2()}
      />
    ))
  )
  .add(
    'FileUploader example application',
    withInfo({ text: 'example application' })(() => <App />)
  )
  .add(
    'skeleton',
    withInfo({
      text: 'Placeholder skeleton state to use when content is loading.',
    })(() => (
      <div style={{ width: '500px' }}>
        <FileUploaderSkeletonV2 />
      </div>
    ))
  );
