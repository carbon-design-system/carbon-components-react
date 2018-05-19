# Architecture

## Editing

Potential approaches:

* Render Props API
* One component that supports different input types
* Component per input type
  * `EditableCell`
  * `EditableSelectCell`, `EditableTextCell`

Must-haves:

* `initialValue`
* `onSave`
* `onCancel`
* `onChange`
* `onError`
* `validate`
