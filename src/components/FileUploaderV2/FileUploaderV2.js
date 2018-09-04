import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uid from '../../tools/uniqueId';
import { ButtonTypes } from '../../prop-types/types';
import FileUploaderItem from '../FileUploaderItem/FileUploaderItem';

export class FileUploaderButtonV2 extends Component {
  static propTypes = {
    className: PropTypes.string,
    labelText: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    role: PropTypes.string,
    tabIndex: PropTypes.number,
    buttonKind: ButtonTypes.buttonKind,
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

export default function FileUploaderV2(props) {
  const {
    iconDescription,
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
    ...other
  } = props;
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
      />
      <div className="bx--file-container">
        {files.length
          ? files.map((file, index) => (
              <span key={uid()} className="bx--file__selected-file" {...other}>
                <p className="bx--file-filename">{file.name}</p>
                <span className="bx--file__state-container">
                  <FileUploaderItem
                    iconDescription={iconDescription}
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
  iconDescription: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonKind: ButtonTypes.buttonKind,
  labelDescription: PropTypes.string,
  labelTitle: PropTypes.string,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
  accept: PropTypes.arrayOf(PropTypes.string),
  files: PropTypes.arrayOf(PropTypes.object),
};

FileUploaderV2.defaultProps = {
  iconDescription: 'Provide icon description',
  buttonLabel: 'Upload',
  buttonKind: 'primary',
  multiple: false,
  onClick: () => {},
  onChange: () => {},
  accept: [],
  files: [],
};
