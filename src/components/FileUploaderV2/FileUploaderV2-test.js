import React from 'react';
import FileUploaderV2, { FileUploaderButtonV2 } from '../FileUploaderV2';
import FileUploaderSkeletonV2 from '../FileUploaderV2/FileUploaderV2.Skeleton';
import { mount, shallow } from 'enzyme';

describe('FileUploaderButton', () => {
  const button = <FileUploaderButtonV2 className="extra-class" />;
  const mountWrapper = mount(button);

  describe('Renders as expected with default props', () => {
    it('renders with expected className', () => {
      expect(mountWrapper.children().hasClass('bx--file')).toBe(true);
    });

    it('renders with given className', () => {
      expect(mountWrapper.hasClass('extra-class')).toBe(true);
    });

    it('renders with default labelText prop', () => {
      expect(mountWrapper.props().labelText).toEqual('Add file');
    });

    it('renders with default buttonKind prop', () => {
      expect(mountWrapper.props().buttonKind).toEqual('primary');
    });

    it('renders with expected button className', () => {
      expect(mountWrapper.find('.bx--btn--primary').exists()).toBe(true);
    });

    it('renders with default multiple prop', () => {
      expect(mountWrapper.props().multiple).toEqual(false);
    });

    it('renders with default accept prop', () => {
      expect(mountWrapper.props().accept).toEqual([]);
    });

    it('does not have default role', () => {
      expect(mountWrapper.props().role).not.toBeTruthy();
    });

    it('resets the input value onClick', () => {
      const input = mountWrapper.find('.bx--visually-hidden');
      input.instance().value = '';
      const evt = { target: { value: input.instance().value } };
      input.simulate('click', evt);

      expect(evt.target.value).toEqual(null);
    });
  });

  describe('Unique id props', () => {
    it('each FileUploaderButton should have a unique ID', () => {
      const mountedButtons = mount(
        <div>
          <FileUploaderButtonV2 className="extra-class" />
          <FileUploaderButtonV2 className="extra-class" />
        </div>
      );
      const firstButton = mountedButtons.find(FileUploaderButtonV2).at(0);
      const lastButton = mountedButtons.find(FileUploaderButtonV2).at(1);
      const isEqual = firstButton === lastButton;
      expect(isEqual).toBe(false);
    });
  });
});

describe('FileUploader', () => {
  const fileUploader = <FileUploaderV2 className="extra-class" />;
  const mountWrapper = mount(fileUploader);

  describe('Renders as expected with defaults', () => {
    it('should render with default className', () => {
      expect(mountWrapper.children().hasClass('bx--form-item')).toEqual(true);
    });

    it('should render with given className', () => {
      expect(mountWrapper.hasClass('extra-class')).toEqual(true);
    });

    it('renders input with hidden prop', () => {
      expect(mountWrapper.find('input').props().className).toEqual(
        'bx--visually-hidden'
      );
    });
    it('renders with empty div.bx--file-container by default', () => {
      expect(mountWrapper.find('div.bx--file-container').text()).toEqual('');
    });
  });
});

describe('FileUploaderSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<FileUploaderSkeletonV2 />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--form-item')).toEqual(true);
    });
  });
});
