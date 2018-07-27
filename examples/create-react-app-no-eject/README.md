# `examples/create-react-app`

> See how to integrate `carbon-components` and `carbon-components-react` into a project
> bootstrapped with `create-react-app`

## Usage

To run this example, all you need to do is `cd` into the directory, run `yarn install`, and then `yarn start`.

## Deviations from vanilla `create-react-app`

Because create-react-app does not support scss out of the box, we use [react-app-rewired](https://github.com/timarney/react-app-rewired) to circumvent the need for ejecting or forking react-scripts. The webpack override allowing for scss imports has been included.
