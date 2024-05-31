#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { Command } = require('commander');

const program = new Command();

program
  .argument('<component>', 'Component name to install')
  .action((component) => {
    const templatesDir = path.join(__dirname, '../components');
    const projectRoot = process.cwd();
    const destinationDir = path.join(projectRoot, 'components', 'PixelBlock');

    const sourceFile = path.join(templatesDir, `${component}.tsx`);
    const destinationFile = path.join(destinationDir, `${component}.tsx`);

    if (fs.existsSync(sourceFile)) {
      fs.ensureDirSync(destinationDir);
      fs.copyFileSync(sourceFile, destinationFile);
      console.log(`Component ${component} installed successfully.`);
    } else {
      console.error(`Component ${component} not found.`);
    }
  });

program.parse(process.argv);