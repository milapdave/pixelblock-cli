#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { Command } = require('commander');
const { execSync } = require('child_process');
const packageJson = require('../package.json'); // Ensure this path is correct

const program = new Command();

program
  .version(packageJson.version) // Set the version from package.json
  .command('add <component>')
  .description('Add a PixelBlockUI component')
  .action(async (component) => {
    const templatesDir = path.join(__dirname, '../components');
    const projectRoot = process.cwd();
    const destinationDir = path.join(projectRoot, 'components', 'PixelBlock');

    const sourceFile = path.join(templatesDir, `${component}.tsx`);
    const destinationFile = path.join(destinationDir, `${component}.tsx`);

    if (fs.existsSync(sourceFile)) {
      fs.ensureDirSync(destinationDir);
      fs.copyFileSync(sourceFile, destinationFile);
      console.log(`Component ${component} installed successfully.`);

      // Attempt to install dependencies
      try {
        console.log('Installing dependencies...');
        execSync(`cd ${destinationDir} && npm install clsx tailwind-merge`, { stdio: 'inherit' });
        console.log('Dependencies installed successfully.');
      } catch (error) {
        console.error(`Failed to install dependencies: ${error.message}`);
      }
    } else {
      console.error(`Component ${component} not found.`);
    }
  });

program.parse(process.argv);
