import React from 'react';
import { iconCloseSolid, iconCheckmarkSolid } from 'carbon-icons';
import { shallow, mount } from 'enzyme';
import FileUploadStatus from './FileUploadStatus';
import Icon from '../Icon';

const rand3 = () => {
  const n = Math.random();
  switch (n) {
    case n < 0.33:
      return 0;
    case 0.33 < n < 0.66:
      return 1;
    default:
      return 2;
  }
};

const possibleProps = {
  classNames: ['bx--loading', 'bx--file-close', 'bx--file-complete'],
  icons: [
    <div className="bx--loading" role="button">
      <svg className="bx--loading__svg" viewBox="-42 -42 84 84">
        <circle cx="0" cy="0" r="37.5" />
      </svg>
    </div>,
    iconCloseSolid,
    iconCheckmarkSolid,
  ],
  statuses: ['uploading', 'edit', 'complete'],
};

describe('FileUploadStatus', () => {
  describe('Renders as expected', () => {
    const n = rand3();
    const element = (
      <FileUploadStatus
        iconDescription="Upload complete"
        status={possibleProps.statuses[n]}
      />
    );
    const shallowWrapper = shallow(element);
    const mountedWrapper = mount(element);

    it('renders upload status icon as expected', () => {
      expect(shallowWrapper.length).toBe(1);
      n === 0
        ? expect(shallowWrapper.find('div.bx--loading').length).toBe(1)
        : expect(shallowWrapper.find(Icon).length).toBe(1);
    });

    it('should use correct icon', () => {
      n === 0
        ? expect(mountedWrapper.matchesElement(possibleProps[n]))
        : expect(possibleProps.icons).toContain(
            mountedWrapper.find(Icon).props().icon
          );
    });

    it('has the expected classes', () => {
      expect(possibleProps.classNames).toContain(
        shallowWrapper.props().className
      );
    });
  });

  describe('Check that functions passed in as props are called', () => {
    const onClick = jest.fn();
    const onKeyDown = jest.fn();
    const wrapper = mount(
      <FileUploadStatus
        onClick={onClick}
        onKeyDown={onKeyDown}
        status="complete"
      />
    );

    it('should call onClick', () => {
      wrapper.simulate('click');
      expect(onClick).toBeCalled();
    });

    it('should call onKeyDown', () => {
      wrapper.simulate('keydown');
      expect(onKeyDown).toBeCalled();
    });
  });
});
