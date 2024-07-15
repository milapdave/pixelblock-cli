* * *

PixelBlock CLI
==============

PixelBlock CLI is a command-line tool to easily install React UI components from a template library into your project.


Features
--------

* Install individual components from a template library.
* Ensure components are placed in the correct directory in your project.


Installation
------------

You can install PixelBlock CLI globally via npm or Yarn:

### Using npm

`npm install -g pixelblock-cli` 


### Using Yarn

`yarn global add pixelblock-cli` 

Alternatively, you can use it directly with `npx` without installing it globally:

`npx pixelblock-cli add <component>` 


Usage
-----

After installing, you can use the `npx pixelblock-cli` command to install components.


### Install a Component

To install a component, run the following command:

`npx pixelblock-cli add <component>` 

Replace `<component>` with the name of the component you want to install. For example:

`npx pixelblock-cli add button` 

This will copy the `Button.tsx` file from the templates directory to your project's `components/PixelBlock` directory.


### Example


1.  **Navigate to your project directory**:
    
    `cd path/to/your/project` 

    
2.  **Run the install command**:
    
    `npx pixelblock-cli add Button` 
    
    This will copy the `Button.tsx` template file to your project's `components/PixelBlock` directory.
    

Directory Structure
-------------------

Ensure your project directory has the following structure for the CLI to work correctly:

```
your-project/
├── components/
│   └── PixelBlock/
│       └── Button.tsx
└── 
```


Contributing
------------

Contributions are welcome! Please fork the repository and submit a pull request.


License
-------

This project is licensed under the MIT License.

* * *


Troubleshooting
---------------


### Common Issues

1.  **Command Not Found**
    
    Ensure you have installed the CLI tool globally or are using `npx`:
    
    `npx pixelblock-cli add Button` 
    

2.  **Component Not Found**
    
    Make sure the component you are trying to install exists in the `templates` directory of the CLI tool.
    

3.  **Permissions Issues**
    
    If you encounter permissions issues, try running the command with elevated permissions (e.g., using `sudo` on Unix-based systems):
    
    `sudo npx pixelblock-cli add Button` 
    


### Contact

For further assistance, you can reach out to \[your contact email or support channel\].

* * *
