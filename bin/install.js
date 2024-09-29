#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { Command } = require('commander');
const { execSync } = require('child_process');
const readline = require('readline'); // Import readline for user input
const packageJson = require('../package.json'); // Ensure this path is correct

const program = new Command();

// Function to ask the user a yes/no question
const askQuestion = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (yes/no): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes');
    });
  });
};

program
  .version(packageJson.version)
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

      if (fs.existsSync(destinationFile)) {
        // Ask the user if they want to replace the existing file
        const shouldReplace = await askQuestion(`File ${component}.tsx already exists. Do you want to replace it?`);
        if (!shouldReplace) {
          console.log('Operation canceled. No files were changed.');
          return;
        }
      }

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
