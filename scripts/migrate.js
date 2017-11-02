'use strict';

const fs = require('fs');
const path = require('path');

const COMPONENT_PATH = path.resolve(__dirname, '../src/components');
const STORYBOOK_PATH = path.resolve(__dirname, '../.storybook/components');
const TESTS_PATH = path.resolve(__dirname, '../src/components/__tests__');

const componentFiles = fs.readdirSync(COMPONENT_PATH)
  .filter(name => !name.match(/__tests__/));
const storyFiles = fs.readdirSync(STORYBOOK_PATH);
const testFiles = fs.readdirSync(TESTS_PATH);

// componentFiles.forEach(filename => {
  // const name = path.basename(filename, '.js');
  // const folderPath = path.resolve(COMPONENT_PATH, name);
  // const filePath = path.resolve(COMPONENT_PATH, filename);
  // const targetFilePath = path.resolve(COMPONENT_PATH, name, filename);
  // const targetIndexPath = path.resolve(COMPONENT_PATH, name, 'index.js');
  // const indexContent = `import ${name} from './${name}';
// export default ${name};`;

  // fs.mkdirSync(folderPath);
  // fs.copyFileSync(filePath, targetFilePath);
  // fs.writeFileSync(targetIndexPath, indexContent);
// });

// TODO: ListsStory
// storyFiles
  // .filter(filename => filename !== 'ListsStory.js')
  // .forEach(filename => {
    // const name = path.basename(filename, 'Story.js');
    // const filePath = path.resolve(STORYBOOK_PATH, filename);
    // const targetFilePath = path.resolve(COMPONENT_PATH, name, `${name}-story.js`);

    // fs.copyFileSync(filePath, targetFilePath);
  // });

const files = [
  'OrderSummary-test.js',
  'OrderSummaryCategory-test.js',
  'OrderSummaryFooter-test.js',
  'OrderSummaryHeader-test.js',
  'OrderSummaryList-test.js',
  'OrderSummaryListItem-test.js',
  'OrderSummaryTotal-test.js',
  '.eslintrc',
];

testFiles
  .filter(filename => files.indexOf(filename) === -1)
  .forEach(filename => {
  const name = path.basename(filename, '-test.js');
  const filePath = path.resolve(TESTS_PATH, filename);
  const targetFilePath = path.resolve(COMPONENT_PATH, name, filename);

  fs.copyFileSync(filePath, targetFilePath);
});
