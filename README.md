# PixelBlock CLI

PixelBlock CLI is a command-line tool to easily install React UI components and pre-built blocks from a template library into your project.

## Features

* Install individual components from a template library
* Add complete UI blocks (collections of components) for common patterns
* Automatic dependency management for required packages
* Interactive component selection with visual feedback
* Compatible with React and Next.js projects
* Ensure components are placed in the correct directory structure

## Installation

You can install PixelBlock CLI globally via npm or Yarn:

### Using npm
```bash
npm install -g pixelblock-cli
```

### Using Yarn
```bash
yarn global add pixelblock-cli
```

Alternatively, you can use it directly with `npx` without installing it globally:
```bash
npx pixelblock-cli <command>
```

## Usage

After installing, you can use the `pixelblock-cli` command (or `npx pixelblock-cli`) to install components and blocks.

### List Available Components and Blocks

To see what components and blocks are available:
```bash
pixelblock-cli list
```

### Install a Component

To install a component, run the following command:
```bash
pixelblock-cli add <component>
```

Replace `<component>` with the name of the component you want to install. For example:
```bash
pixelblock-cli add Button
```

If you don't specify a component, you'll be presented with an interactive list to choose from:
```bash
pixelblock-cli add
```

### Install a Block

To install a pre-built UI block:
```bash
pixelblock-cli add-block <blockName>
```

For example:
```bash
pixelblock-cli add-block login
```

Or select interactively from available blocks:
```bash
pixelblock-cli add-block
```

### Options

Most commands support these options:
* `-f, --force`: Force installation without confirmation prompts
* `-v, --version`: Display version information

## Example

1. **Navigate to your project directory**:
   ```bash
   cd path/to/your/project
   ```

2. **Run the install command**:
   ```bash
   pixelblock-cli add Button
   ```
   This will copy the `Button.tsx` template file to your project's `components/PixelBlock` directory.

3. **Import the component in your code**:
   ```jsx
   import { Button } from '@/components/PixelBlock/Button';
   ```

## Directory Structure

After installation, your project directory will have the following structure:

```
your-project/
├── components/
│   └── PixelBlock/           # Individual components
│       ├── Button.tsx
│       ├── Input.tsx
│       └── blocks/           # UI blocks
│           └── login/        # Login block
│               ├── index.tsx
│               ├── LoginForm.tsx
│               └── ...
└── ...
```

## Dependencies

The tool automatically installs these dependencies if they're missing:
* `clsx`: Utility for conditionally constructing class strings
* `tailwind-merge`: Smart Tailwind CSS class merger

## Troubleshooting

### Common Issues

1. **Command Not Found**
   
   Ensure you have installed the CLI tool globally or are using `npx`:
   ```bash
   npx pixelblock-cli add Button
   ```

2. **Component Not Found**
   
   Make sure the component you are trying to install exists in the templates directory of the CLI tool.

3. **Permissions Issues**
   
   If you encounter permissions issues, try running the command with elevated permissions (e.g., using `sudo` on Unix-based systems):
   ```bash
   sudo npx pixelblock-cli add Button
   ```

4. **Project Structure Not Recognized**

   Ensure you're running the command in a valid React/Next.js project with React in your dependencies.

### Contact

For further assistance, you can reach out to [your contact email or support channel].

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
