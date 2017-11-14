// `GenericItem` corresponds to an item in a collection that is passed to
// MultiSelect that is in a predictable shape and works with the default
// `itemTostring` out of the box.
export const generateGenericItem = index => ({
  id: `id-${index}`,
  label: `Item ${index}`,
  value: index,
});

// `CustomItem` corresponds to a potentially different item structure that
// might be passed into MultiSelect that we would need to supply a custom
// `itemToString` method for
export const generateCustomItem = index => ({
  field: `Item ${index}`,
  value: `Custom value ${index}`,
});

export const generateItems = (amount, generator) =>
  Array(amount).fill(null).map((_, i) => generator(i));

export const customItemToString = ({ field }) => field;
