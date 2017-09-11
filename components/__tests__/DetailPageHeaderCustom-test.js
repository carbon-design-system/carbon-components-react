import React from 'react';
import { mount } from 'enzyme';
import DetailPageHeaderCustom from '../DetailPageHeaderCustom';
import Icon from '../Icon';

describe('DetailPageHeaderCustom', () => {
  const defaultProps = {
    title: 'Detail Page Header',
  };

  const topProps = {
    ...defaultProps,
    top: <div>Top</div>,
  };

  const bottomProps = {
    ...defaultProps,
    bottom: <div>Bottom</div>,
  };

  const sideProps = {
    ...defaultProps,
    side: <div>Side</div>,
  };

  const extraProps = {
    ...defaultProps,
    extra: <div>Extra</div>,
  };

  let wrapper;
  it('should render wrapper with the correct class', () => {
    wrapper = mount(
      <DetailPageHeaderCustom {...defaultProps} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom').prop('className'), 'bx--detail-page-header-custom');
  });

  it('should lock properly', () => {
    // test unlocked state
    let props = {...defaultProps, lockState: 'unlocked'};
    wrapper = mount(
      <DetailPageHeaderCustom {...defaultProps} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom').prop('className'), 'bx--detail-page-header-custom');

    // test expanded state
    props = {...defaultProps, lockState: 'expanded'};
    wrapper = mount(
      <DetailPageHeaderCustom {...defaultProps} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom').prop('className'), 'bx--detail-page-header-custom');

    // test collapsed state
    props = {...defaultProps, lockState: 'collapsed'};
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom').prop('className'), 'bx--detail-page-header-custom bx--detail-page-header-custom--collapsed');
  });

  it('should render icon properly', () => {
    // test no icon passed in
    let props = {...defaultProps };
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom--icon-container').length, 1);

    // test with icon passed in
    props = {...defaultProps, icon: <Icon name="watson" />, };
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom--icon-container').length, 1);
  });

  it('should render top section properly', () => {
    // test for no top
    let props = {...defaultProps };
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom__top').length, 0);

    // test with top
    props = {...topProps };
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom__top').length, 1);
  });

  it('should render bottom section properly', () => {
    // test for no top
    let props = {...defaultProps };
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom__bottom').length, 0);

    // test with top
    props = {...bottomProps };
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom__bottom').length, 1);
  });

  it('should render extra section properly', () => {
    // test for no top
    let props = {...defaultProps };
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom__extra').length, 0);

    // test with top
    props = {...extraProps };
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom__extra').length, 1);
  });

  it('should render side section properly', () => {
    // test for no top
    let props = {...defaultProps };
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom__side').length, 0);

    // test with top
    props = {...sideProps };
    wrapper = mount(
      <DetailPageHeaderCustom {...props} />
    );
    expect(wrapper.find('.bx--detail-page-header-custom__side').length, 1);
  });

});
