import React from 'react';
import { storiesOf } from '@storybook/react';
import Slider from '../../components/Slider';
import TextInput from '../../components/TextInput';

storiesOf('Slider', module)
  .addWithInfo(
    'default',
    `
      lorem
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <div className="bx--form-item">
          <label htmlFor="slider" className="bx--label">Slider Label</label>
          <Slider id="slider" value={50} min={0} max={100} step={1}>
            <TextInput className="bx--text-input bx-slider-text-input"/>
        {/* <input id="slider-input-box" type="text" className="bx--text-input bx-slider-text-input" placeholder="0" /> */}
          </Slider>
        </div>
      </div>
    )
  );
