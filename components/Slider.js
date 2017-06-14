import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

class Slider extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  state = {
  };

  componentDidMount() {
    // this.updatePosition()
  }

  updatePosition(evt) {
    const {
      left,
      newValue,
    } = this.calcValue(evt);


    if (this.dragging) {
      return;
    }

    this.dragging = true;

    requestAnimationFrame(() => {
      this.dragging = false;
      this.thumb.style.left = `${left}%`;
      this.filledTrack.style.transform = `translate(0%, -50%) scaleX(${left / 100})`;
      this.input.value = newValue;
      this.updateInput();
      this.changeState('slider-value-change', { value: newValue });
    });
  }

  calcValue(evt) {
    const {
      value,
      min,
      max,
      step,
    } = this.getInputProps();

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
            ? (range / step) / this.options.stepMuliplier
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

  getInputProps() {
    const values = {
      value: this.input.value,
      min: this.input.min,
      max: this.input.max,
      step: this.input.step ? this.input.step : 1,
    };
    return values;
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

  handleMouse = (type) => {
    if (type === 'down') {
      this.element.ownerDocument.addEventListener('mousemove',  (evt) => { this.updatePosition(evt); })
    }
  }


  render() {
    return (
      <div className="bx--form-item">
        <label htmlFor="slider" className="bx--label">Slider Label</label>
        <div className="bx--slider-container">
          <span className="bx--slider__range-label">0</span>
          <div
            className="bx--slider"
            onMouseDown={() => this.handleMouse('down')}
            onMouseUp={() => this.handleMouse('up')}
          >
            <div className="bx--slider__track"></div>
            <div className="bx--slider__filled-track"></div>
            <div className="bx--slider__thumb" tabindex="0"></div>
            <input id="slider" className="bx--slider__input" type="range" step="1" min="0" max="100" value="50" />
          </div>
          <span className="bx--slider__range-label">100</span>
          <input id="slider-input-box" type="text" className="bx--text-input bx-slider-text-input" placeholder="0" />
        </div>
      </div>
    );
  }
}

export default Slider;
