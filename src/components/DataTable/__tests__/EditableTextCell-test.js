describe('EditableTextCell', () => {
  it('should render');

  it('should default to the initialValue provided');

  it('should switch to edit mode when a user clicks on the edit button');

  it(
    'should switch to edit mode when a user presses spacebar on the edit button'
  );

  it('should update the value of the input as the user types');

  it('should revert any changes to the input if the cancel button is clicked');

  it(
    'should call the `onCancel` hook with the value of the input when cancelled'
  );

  it('should call validate on each change to the value of the input');

  it(
    'should show validation errors if they exist in response to input changes'
  );

  it(
    'should call `onSave` prop when the user clicks on Save and show a spinner'
  );

  it('should show a success icon if `onSave` does not throw an error');

  it('should fade out the success icon after 3000ms');

  it('should switch to invalid state if `onSave` fails');
});
