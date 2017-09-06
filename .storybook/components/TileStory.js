import React from "react";
import { storiesOf, action } from "@storybook/react";
import { Tile, ClickableTile, SelectableTile, ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from "../../components/Tile";

storiesOf("Tile", module)
  .addWithInfo(
    "Default",
    `
      Default tile without any interactions
    `,
    () =>
      <Tile>Default tile</Tile>
  )
  .addWithInfo(
    "Clickable",
    `
      Clickable tile
    `,
    () =>
      <ClickableTile>Clickable Tile</ClickableTile>
  )
  .addWithInfo(
    "Selectable",
    `
      Selectable tile
    `,
    () =>
      <SelectableTile id="tile-1" name="tiles">Selectable Tile</SelectableTile>
  )
  .addWithInfo(
    "Expandable",
    `
      Expandable tile
    `,
    () =>
      <ExpandableTile>
        <TileAboveTheFoldContent>
          Above the fold content here
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          Below the fold content here
        </TileBelowTheFoldContent>
      </ExpandableTile>
  )
