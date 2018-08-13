/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import fetchMock from 'fetch-mock';
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
      });
      const index = files.findIndex(file => file.uuid === uuid);
      this.upload({ file })
        .then(() => {
          fetchMock.restore();
          files[index].status = 'complete';
          this.setState({ files });
        })
        .catch(error => {
          files[index].status = 'edit';
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
  .addWithInfo(
    'FileUploaderButton',
    `
      The FileUploaderButton can be used as a standalone component if you do not need the extra UI that comes with FileUploader. The FileUploaderButton is used in FileUploader.
    `,
    () => (
      <FileUploaderButtonV2
        labelText="Add files"
        className="bob"
        name="file"
        onChange={() => console.log('hi')}
        multiple
      />
    )
  )
  .addWithInfo(
    'FileUploader example application',
    `
      example application
    `,
    () => <App />
  )
  .addWithInfo(
    'skeleton',
    `
      Placeholder skeleton state to use when content is loading.
    `,
    () => (
      <div style={{ width: '500px' }}>
        <FileUploaderSkeletonV2 />
      </div>
    )
  );
