import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uid from '../../tools/uniqueId';
import { ButtonTypes } from '../../prop-types/types';
import FileUploadStatus from '../FileUploadStatus/FileUploadStatus';

export class FileUploaderButtonV2 extends Component {
  static propTypes = {
    /**
     * Provide a custom className to be applied to the container node
     */
    className: PropTypes.string,
    /**
     * Provide a unique id for the underlying <input> node
     */
    id: PropTypes.string,
    /**
     * Provide the label text to be read by screen readers when interacting with
     * this control
     */
    labelText: PropTypes.string,
    /**
     * Specify if the component should accept multiple files to upload
     */
    multiple: PropTypes.bool,
    /**
     * Provide a name for the underlying <input> node
     */
    name: PropTypes.string,
    /**
     * Provide an optional `onChange` hook that is called each time the <input>
     * value changes
     */
    onChange: PropTypes.func,
    /**
     * Provide an optional `onClick` hook that is called each time the button is
     * clicked
     */
    onClick: PropTypes.func,
    /**
     * Provide an accessibility role for the <FileUploaderButton>
     */
    role: PropTypes.string,
    /**
     * Provide a custom tabIndex value for the <FileUploaderButton>
     */
    tabIndex: PropTypes.number,
    /**
     * Specify the type of underlying button
     */
    buttonKind: ButtonTypes.buttonKind,
    /**
     * Specify the types of files that this input should be able to receive
     */
    accept: PropTypes.arrayOf(PropTypes.string),
  };
  static defaultProps = {
    tabIndex: 0,
    labelText: 'Add file',
    buttonKind: 'primary',
    multiple: false,
    onChange: () => {},
    onClick: () => {},
    accept: [],
  };
  uid = this.props.id || uid();

  render() {
    const {
      className,
      multiple,
      role,
      tabIndex,
      buttonKind,
      accept,
      name,
      onChange,
      labelText,
      ...other
    } = this.props;
    const classes = classNames({
      'bx--file': true,
      [className]: className,
    });

    return (
      <div
        role="button"
        tabIndex="0"
        className={classes}
        onKeyDown={evt => {
          if (evt.which === 13 || evt.which === 32) {
            this.input.click();
          }
        }}>
        <label
          className={`bx--btn bx--btn--${buttonKind}`}
          tabIndex={tabIndex}
          htmlFor={this.uid}
          role={role}
          {...other}>
          {labelText}
        </label>
        <input
          className="bx--visually-hidden"
          ref={input => (this.input = input)}
          id={this.uid}
          type="file"
          multiple={multiple}
          accept={accept}
          name={name}
          onChange={onChange}
          onClick={evt => {
            evt.target.value = null;
          }}
        />
      </div>
    );
  }
}

export default function FileUploaderV2({
  buttonLabel,
  buttonKind,
  labelDescription,
  labelTitle,
  className,
  multiple,
  accept,
  name,
  onChange,
  onClick,
  files,
  tabIndex,
  role,
  id,
  ...other
}) {
  const handleChange = evt => onChange({ evt, multiple });
  const classes = classNames({
    'bx--form-item': true,
    [className]: className,
  });

  return (
    <div className={classes} {...other}>
      <strong className="bx--label">{labelTitle}</strong>
      <p className="bx--label-description">{labelDescription}</p>
      <FileUploaderButtonV2
        labelText={buttonLabel}
        multiple={multiple}
        buttonKind={buttonKind}
        onChange={handleChange}
        accept={accept}
        name={name}
        tabIndex={tabIndex}
        role={role}
        id={id}
      />
      <div className="bx--file-container">
        {files.length
          ? files.map((file, index) => (
              <span key={uid()} className="bx--file__selected-file" {...other}>
                <p className="bx--file-filename">{file.name}</p>
                <span className="bx--file__state-container">
                  <FileUploadStatus
                    iconDescription={file.iconDescription}
                    status={file.status}
                    onKeyDown={evt => {
                      if (evt.which === 13 || evt.which === 32) {
                        onClick({ evt, index });
                      }
                    }}
                    onClick={evt => {
                      if (file.status === 'edit') {
                        onClick({ evt, index });
                      }
                    }}
                  />
                </span>
              </span>
            ))
          : null}
      </div>
    </div>
  );
}

FileUploaderV2.propTypes = {
  /**
   * Provide a label for the <FileUploaderButton>
   */
  buttonLabel: PropTypes.string,
  /**
   * Specify the type of underlying button
   */
  buttonKind: ButtonTypes.buttonKind,
  /**
   * Provide description text for the <FileUploaderV2> label
   */
  labelDescription: PropTypes.string,
  /**
   * Provide a label title for the input form
   */
  labelTitle: PropTypes.string,
  /**
   * Provide a unique id for the underlying <input> node
   */
  id: PropTypes.string,
  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,
  /**
   * Provide a name for the underlying <input> node
   */
  name: PropTypes.string,
  /**
   * Provide an optional `onClick` hook that is called each time the button is
   * clicked
   */
  onClick: PropTypes.func,
  /**
   * Provide an optional `onChange` hook that is called each time the <input>
   * value changes
   */
  onChange: PropTypes.func,
  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),
  /**
   * Array of files in <FileUploaderV2>
   */
  files: PropTypes.arrayOf(PropTypes.object),
  /**
   * Provide a custom tabIndex value for the <FileUploaderButton>
   */
  tabIndex: PropTypes.number,
  /**
   * Provide an accessibility role for the <FileUploaderButton>
   */
  role: PropTypes.string,
};

FileUploaderV2.defaultProps = {
  buttonLabel: 'Upload',
  buttonKind: 'primary',
  multiple: false,
  onClick: () => {},
  onChange: () => {},
  accept: [],
  files: [],
  tabIndex: 0,
};
