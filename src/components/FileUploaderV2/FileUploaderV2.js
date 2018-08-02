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
          style={{ ...style, width: '1rem', height: '1rem' }}
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

export default class FileUploaderV2 extends Component {
  static propTypes = {
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
    action: PropTypes.string,
    upload: PropTypes.func,
    files: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    iconDescription: 'Provide icon description',
    buttonLabel: 'Upload',
    buttonKind: 'primary',
    multiple: false,
    onClick: () => {},
    onChange: () => {},
    accept: [],
    upload: () => new Promise(() => {}),
    files: [],
  };

  state = {
    files: [],
  };

  nodes = [];

  handleClick = ({ evt, index }) => {
    const filteredArray = this.state.files.filter(
      file => file.name !== this.nodes[index].innerText.trim()
    );
    this.setState({ files: filteredArray });
    this.props.onClick(evt);
  };

  render() {
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
      files,
      upload, // eslint-disable-line
      ...other
    } = this.props;

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
          onChange={onChange}
          accept={accept}
          name={name}
        />
        <div className="bx--file-container">
          {files.length
            ? files.map((file, index) => (
                <span
                  key={uid()}
                  className="bx--file__selected-file"
                  ref={node => (this.nodes[index] = node)}
                  {...other}>
                  <p className="bx--file-filename">{file.name}</p>
                  <span className="bx--file__state-container">
                    <FilenameV2
                      iconDescription={iconDescription}
                      status={file.status}
                      onKeyDown={evt => {
                        if (evt.which === 13 || evt.which === 32) {
                          this.handleClick({ evt, index });
                        }
                      }}
                      onClick={evt => {
                        if (file.status === 'edit') {
                          this.handleClick({ evt, index });
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
}
