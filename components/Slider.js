import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

class Slider extends Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    stepMuliplier: PropTypes.number,
    children: PropTypes.node,
  };

  static defaultProps = {
    stepMuliplier: 4,
  }

  state = {
    dragging: false,
    value: this.props.value,
    left: 0,
  };

  componentDidMount() {
    // this.updatePosition()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      // this.setState({ open: nextProps.open });
      this.updatePosition()
    }
  }

  updatePosition(evt) {
    const {
      left,
      newValue,
    } = this.calcValue(evt);
    this.setState({
      left,
      value: newValue,
     });

    // if (this.state.dragging) {
    //   return;
    // }
    //
    // this.state.dragging = true;
    //
    // requestAnimationFrame(() => {
    //   this.state.dragging = false;
    //   this.thumb.style.left = `${left}%`;
    //   this.filledTrack.style.transform = `translate(0%, -50%) scaleX(${left / 100})`;
    //   this.setState({
    //     left,
    //     value: newValue,
    //    });
    //   // this.updateInput();
    // });
  }

  calcValue(evt) {
    const {
      min,
      max,
      step,
      stepMuliplier,
    } = this.props;

    const { value } = this.state;

    const range = max - min;
    const valuePercentage = (((value - min) / range) * 100);

    let left;
    let newValue;
    left = valuePercentage;
    newValue = value;

    if (evt) {
      const { type } = evt;

      if (type === 'keydown') {
        const direction = {
          40: -1, // decreasing
          37: -1, // decreasing
          38: 1, // increasing
          39: 1, // increasing
        }[evt.which];

        if (direction !== undefined) {
          const multiplier = evt.shiftKey === true
            ? (range / step) / stepMuliplier
            : 1;
          const stepMultiplied = step * multiplier;
          const stepSize = (stepMultiplied / range) * 100;
          left = valuePercentage + (stepSize * direction);
          newValue = Number(value) + (stepMultiplied * direction);
        }
      }
      if (type === 'mousemove' || type === 'click') {
        const track = this.track.getBoundingClientRect();
        const unrounded = ((evt.clientX - track.left) / track.width);
        const rounded = Math.round(((range * unrounded) / step)) * step;
        left = (((rounded - min) / range) * 100);
        newValue = rounded;
      }
    }

    if (newValue <= Number(min)) {
      left = 0;
      newValue = min;
    }
    if (newValue >= Number(max)) {
      left = 100;
      newValue = max;
    }

    return { left, newValue };
  }

  updateInput() {
    if (this.boundInput) {
      this.boundInput.value = this.input.value;
    }
  }

  setValue(value) {
    this.input.value = value;
    this._updatePosition();
  }

  stepUp() {
    this.input.stepUp();
    this._updatePosition();
  }

  stepDown() {
    this.input.stepDown();
    this._updatePosition();
  }

  handleMouseStart = () => {
    console.log("hi");
    this.element.ownerDocument.addEventListener('mousemove',  (evt) => { this.updatePosition(evt); })
    this.element.ownerDocument.addEventListener('mouseup', this.handleMouseEnd())
  }

  handleMouseEnd = () => {
    console.log("hi2");

    this.element.ownerDocument.removeEventListener('mousemove', (evt) );
    this.element.ownerDocument.removeEventListener('mouseup', this.handleMouseEnd());
  }

  render() {
    const {
      value,
      min,
      max,
      step,
      required,
      children,
    } = this.props;

    const filledTrackStyle = {
      transform: `translate(0%, -50%) scaleX(${this.state.left / 100})`,
    }
    const thumbStyle = {
      left: `${this.state.left}%`,
    }
    return (
      <div className="bx--slider-container">
        <span className="bx--slider__range-label">0</span>
        <div
          id={this.props.id}
          className="bx--slider"
          ref={node => {
            this.element = node;
          }}
          onClick={(evt) => this.updatePosition(evt)}
        >
          <div
            className="bx--slider__track"
            ref={node => {
              this.track = node;
            }}
          >
          </div>
          <div className="bx--slider__filled-track" style={filledTrackStyle}></div>
          <div
            className="bx--slider__thumb"
            tabIndex="0"
            style={thumbStyle}
            onMouseDown={() => this.handleMouseStart()}
            onKeyDown={(evt) => this.updatePosition(evt)}
          >
          </div>
          <input
            type="hidden"
            value={value}
            required={required}
            min={min}
            max={max}
            step={step}
          />
        </div>
        <span className="bx--slider__range-label">100</span>
        {children}
      </div>
    );
  }
}

export default Slider;
