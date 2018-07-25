/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import FileUploaderV2, { FileUploaderButtonV2 } from '../FileUploaderV2';
import FileUploaderSkeletonV2 from '../FileUploaderV2/FileUploaderV2.Skeleton';
import Button from '../Button';

class App extends React.Component {
  upload = ({ file }) =>
    fetch('https://jsonplaceholder.typicode.com/posts/', {
      method: 'POST',
      body: file,
    }).then(res => res.json());

  render() {
    return (
      <div className="bx--file__container">
        <FileUploaderV2
          labelTitle="Upload"
          buttonLabel="Add files"
          name="file"
          multiple
          ref={fileUploader => (this.fileUploader = fileUploader)}
          upload={this.upload}
        />
        <Button
          kind="secondary"
          small
          style={{ marginTop: '1rem' }}
          onClick={() => {
            this.fileUploader.clearFiles();
          }}>
          Clear File
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
        labeltext="Add files"
        className="bob"
        name="file"
        onChange={() => console.log('hi')}
        multiple
      />
    )
  )
  .addWithInfo(
    'FileUploader',
    `
      The FileUploader components allow the user to upload any necessary files. This uses the FileUploaderButton and Filename components. Filename components will appear below the FileUploaderButton when files are added. Use the status prop to control what icon appears in Filename ('edit', 'complete', or 'uploading'). The FileUploader component contains a method to clear all files uploaded, clearFiles. This can be used with a ref in the parent component. The clear file button in this example is an example of how to use the clearFiles method.
    `,
    () => (
      <div className="bx--file__container">
        <FileUploaderV2
          labelTitle="Upload"
          labelDescription="only .jpg and .png files at 500mb or less"
          buttonLabel="Add files"
          status="edit"
          accept={['.jpg', '.png']}
          name="file"
          multiple
          ref={fileUploader => (this.fileUploader = fileUploader)}
        />
        <Button
          kind="secondary"
          small
          style={{ marginTop: '1rem' }}
          onClick={() => {
            this.fileUploader.clearFiles();
          }}>
          Clear File
        </Button>
      </div>
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
