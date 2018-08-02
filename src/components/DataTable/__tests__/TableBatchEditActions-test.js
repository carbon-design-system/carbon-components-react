import React from 'react';
import { shallow } from 'enzyme';
import InlineLoading from '../../InlineLoading';
import { TableBatchEditActions } from '../';

describe('DataTable.TableBatchEditActions', () => {
  const onSave = jest.fn();
  const onCancel = jest.fn();

  it('should render', () => {
    const wrapper = shallow(
      <TableBatchEditActions onSave={onSave} onCancel={onCancel} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(
      <TableBatchEditActions
        data-foo="Foo"
        onSave={onSave}
        onCancel={onCancel}
      />
    );
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should show the action bar when activated', () => {
    const wrapper = shallow(
      <TableBatchEditActions
        shouldShowBatchActions
        onSave={onSave}
        onCancel={onCancel}
      />
    );
    expect(wrapper.hasClass('bx--batch-actions--active')).toBe(true);
  });

  it('should show the spinner during saving', () => {
    const wrapper = shallow(
      <TableBatchEditActions
        shouldShowBatchActions
        saving
        onSave={onSave}
        onCancel={onCancel}
      />
    );
    expect(
      wrapper
        .find(InlineLoading)
        .matchesElement(
          <InlineLoading description="Saving..." success={false} />
        )
    ).toBe(true);
  });

  it('should show the checkmark once saving completes', () => {
    const wrapper = shallow(
      <TableBatchEditActions
        shouldShowBatchActions
        saving
        saved
        onSave={onSave}
        onCancel={onCancel}
      />
    );
    expect(
      wrapper
        .find(InlineLoading)
        .matchesElement(<InlineLoading description="Saving..." success />)
    ).toBe(true);
  });
});
