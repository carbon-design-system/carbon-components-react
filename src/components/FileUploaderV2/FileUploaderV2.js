import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import uid from '../../tools/uniqueId';
import { ButtonTypes } from '../../prop-types/types';
import { iconCloseSolid, iconCheckmarkSolid } from 'carbon-icons';

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

export function FilenameV2({
  iconDescription,
  onKeyDown,
  status,
  style,
  tabIndex,
  ...other
}) {
  switch (status) {
    case 'uploading':
      return (
        <div
          className="bx--loading"
          style={{ ...style }}
          tabIndex={tabIndex}
          onKeyDown={onKeyDown}
          role="button"
          {...other}>
          <svg className="bx--loading__svg" viewBox="-42 -42 84 84">
            <circle cx="0" cy="0" r="37.5" />
          </svg>
        </div>
      );
    case 'edit':
      return (
        <Icon
          description={iconDescription}
          className="bx--file-close"
          icon={iconCloseSolid}
          style={style}
          tabIndex={tabIndex}
          onKeyDown={onKeyDown}
          role="button"
          {...other}
        />
      );
    case 'complete':
      return (
        <Icon
          description={iconDescription}
          className="bx--file-complete"
          icon={iconCheckmarkSolid}
          style={style}
          tabIndex={tabIndex}
          onKeyDown={onKeyDown}
          role="button"
          {...other}
        />
      );
    default:
      return null;
  }
}
FilenameV2.propTypes = {
  onKeyDown: PropTypes.func,
  style: PropTypes.object,
  status: PropTypes.oneOf(['edit', 'complete', 'uploading']),
  tabIndex: PropTypes.number,
};
FilenameV2.defaultProps = {
  onKeyDown: () => {},
  status: 'uploading',
  style: {},
  tabIndex: 0,
};

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
  const handleClick = ({ evt, index }) => onClick({ evt, index });
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
        multiple={multiple || undefined}
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
                  <FilenameV2
                    iconDescription={iconDescription}
                    status={file.status}
                    onKeyDown={evt => {
                      if (evt.which === 13 || evt.which === 32) {
                        handleClick({ evt, index });
                      }
                    }}
                    onClick={evt => {
                      if (file.status === 'edit') {
                        handleClick({ evt, index });
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
