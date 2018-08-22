import React from 'react';
import { shallow } from 'enzyme';
import InlineLoading from '../../InlineLoading';
import { BatchEditableTableActions } from '../';

describe('DataTable.BatchEditableTableActions', () => {
  const onSave = jest.fn();
  const onCancel = jest.fn();

  it('should render', () => {
    const wrapper = shallow(
      <BatchEditableTableActions onSave={onSave} onCancel={onCancel} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom attributes on the top-level node', () => {
    const wrapper = shallow(
      <BatchEditableTableActions
        data-foo="Foo"
        onSave={onSave}
        onCancel={onCancel}
      />
    );
    expect(wrapper.prop('data-foo')).toBe('Foo');
  });

  it('should show the action bar when activated', () => {
    const wrapper = shallow(
      <BatchEditableTableActions
        shouldShowBatchActions
        onSave={onSave}
        onCancel={onCancel}
      />
    );
    expect(wrapper.hasClass('bx--batch-actions--active')).toBe(true);
  });

  it('should show the spinner during saving', () => {
    const wrapper = shallow(
      <BatchEditableTableActions
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
      <BatchEditableTableActions
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
