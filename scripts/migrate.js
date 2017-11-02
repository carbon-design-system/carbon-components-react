'use strict';

const fs = require('fs');
const path = require('path');

const COMPONENT_PATH = path.resolve(__dirname, '../src/components');
const STORYBOOK_PATH = path.resolve(__dirname, '../.storybook/components');

const componentFiles = fs.readdirSync(COMPONENT_PATH)
  .filter(name => !name.match(/__tests__/));
const storyFiles = fs.readdirSync(STORYBOOK_PATH);

componentFiles.forEach(filename => {
  const name = path.basename(filename, '.js');
  const folderPath = path.resolve(COMPONENT_PATH, name);
  const filePath = path.resolve(COMPONENT_PATH, filename);
  const targetFilePath = path.resolve(COMPONENT_PATH, name, filename);
  const targetIndexPath = path.resolve(COMPONENT_PATH, name, 'index.js');
  const indexContent = `import ${name} from './${name}';
export default ${name};`;

  console.log('Make directory:', folderPath)
  console.log('Copy file:', filePath, targetFilePath);
  console.log('Write file:', targetIndexPath, indexContent)
  // fs.mkdirSync(folderPath);
  // fs.copyFileSync(filePath, targetFilePath);
  // fs.writeFileSync(targetIndexPath, indexContent);
});
