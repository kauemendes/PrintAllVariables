# Introduction

Azure Devops Task for initialize SonarQube projects built in **TypeScript**, configured package.json with commands

# Getting Started

## Commands

Execute the following commands with `npm run`

- `install-task-lib`
  - responsible for installing the package.json for dev purpose into the task folder. Make sure to install `npm install` dependencies on the root folder first
- `clean`
  - Responsible for cleaning the folder project
- `compile`
  - Responsible for compiling the project and generating the javaScript files, you can execute the javascript files using `node`. Ex: `node printAllVariables/printAllVariables.js`
- `package`
  - Responsible for generating the `.vsix` package, that can be installed at azure devops.
  

## Project folder organization:
- printAllVariables 
     - It's responsible for the source code of the tasks. At `printAllVariables.ts`
- `.taskkey` 
      - Responsible for keep the GUID keys of each build
- `package.json` 
      - It's responsible for commands and packages the project uses
- `tsconfig.json` 
      - It's responsible for direct the build typescript should do 
- `static` 
      - It's responsible for keeping the image icon of the project
- `vss-extension.json` 
      - It's responsible for the maintaince of the documentation of the task and overall version
- `printAllVariables/task.json` 
      - It's responsible for the maintaince of the documentation of the task and version, at every new version before `compile`, please make sure to increase the major, minor or patch version of this. Without this, the package will not be affected when installed at azure devops marketplace.

For more information about how a azure-devops task is organize as project, [please check it here](https://montemagno.com/building-vsts-tasks-with-typescript-and-vs-code)

# Some Points

This task receives 3 parameters, called inputs. 

```
{
      "name": "type_input_transform",
      "type": "pickList",
      "label": "How would you like your variables?",
      "defaultValue": "asItis",
      "required": true,
      "helpMarkDown": "Choose how would you like your variables to be re-set, lower case, upper case or leave as it is.",
      "options": {
            "lower": "Lower Case",
            "upper": "Upper Case",
            "asItis": "Leave as it is"
      }
},
{
      "name": "filtered_variables",
      "type": "multiLine",
      "label": "Put your variables name in this list:",
      "required": false,
      "helpMarkDown": "To manipulate the environment variables you need to insert in here which variable you would like to transform."
},
{
      "name": "change_variable_name",
      "type": "boolean",
      "label": "Manipulate Variable NAME",
      "defaultValue": false,
      "required": false,
      "helpMarkDown": "This option enable transforming variable names."
},
{
      "name": "change_variable_value",
      "type": "boolean",
      "label": "Manipulate Variable VALUE",
      "defaultValue": false,
      "required": false,
      "helpMarkDown": "This option enable transforming variable values."
},
{
      "name": "separator_into_variable",
      "type": "string",
      "label": "Choose the separator character:",
      "defaultValue": null,
      "required": false,
      "helpMarkDown": "You can choose the separator between the string"
}
```

The first one is responsible for choosing what type of transformation you would like to do in the environments variables:
      - upper - For upper case variables
      - lower - For lower case variables
      - Leave as it is - For let the variables be at was written.
      

The second parameter is the variable separator. At this version the separator included to be replaced is: dot, underscore and hyphen. The replacement will only occur on the name of the variables. You can choose whatever separator suits you.

- filtered_variables: Add the variables you want to manipulate, the variables value or name only will be change if is into this parameter
- change_variable_value or change_variable_name: If setted with true will manipulate the value or name respectively.

# Contribution

Please feel free to contribute with this project, make sure to create a pull requests or if you find any errors create an issue that it will discussed afterwards to be implemented or not in case of this make sense. @ [Millennium BCP ALM Team](https://scs.millenniumbcp.net/PT.BCP/BCP.ALM.Team)