# Change

- Flatpickr is pinned to version 4.3.0
- Adds keydown event listener for escape on calendar container. Returns focus to input.

# Reasoning

Accessibility and usability regressions were introduced in version 4.4.0. When config for `allowInput` is set to `true` arrow keys are disabled for in-calendar navigation.
