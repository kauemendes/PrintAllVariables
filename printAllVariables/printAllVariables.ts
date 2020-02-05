import tl = require('azure-pipelines-task-lib/task');
import { isNullOrUndefined } from 'util';

function arrayContains(needle, arrhaystack)
{
    return (arrhaystack.indexOf(needle) > -1);
}

async function run() {
    try {
        //do your actions
        const allVariables = tl.getVariables();
        let variablesToFilter: string[] = tl.getDelimitedInput('filtered_variables', '\n', false);
        let lchangeVariableValue: Boolean = tl.getBoolInput('change_variable_value')
        let lchangeVariableName: Boolean = tl.getBoolInput('change_variable_name')
        let typeVariableTransformation = tl.getInput("type_input_transform");
        let separatorIntoVariable = tl.getInput("separator_into_variable");

        if (isNullOrUndefined(separatorIntoVariable)) {
            console.log("INFO: Separators are set as default");
        }
        
        var sortedArray: tl.VariableInfo[] = allVariables.sort((obj1, obj2) => {
            if (obj1.name > obj2.name) {
                return 1;
            }
        
            if (obj1.name < obj2.name) {
                return -1;
            }
            return 0;
        });

        if(variablesToFilter.length === 0) {
            console.log("INFO: None variables will be manipulate, only printing...");
        }

        variablesToFilter = variablesToFilter.map(function(x){ return x.toUpperCase() })

        console.log("INFO: All the variables in this format: [variable name] => value")
        sortedArray.forEach(element => {
            let newValue = element.value;
            let newName = element.name;
            if (arrayContains(element.name.toUpperCase(), variablesToFilter)) {
                if (!isNullOrUndefined(separatorIntoVariable) && lchangeVariableName) {
                    // Changes all occurrancies
                    newName = newName.replace(/\_/g, separatorIntoVariable);
                    newName = newName.replace(/\-/g, separatorIntoVariable);
                    newName = newName.replace(/\./g, separatorIntoVariable);
                    newName = newName.replace(/\>/g, separatorIntoVariable);
                    newName = newName.replace(/\</g, separatorIntoVariable);
                    newName = newName.replace(/\:/g, separatorIntoVariable);
                }
                
                switch (typeVariableTransformation) {
                    case 'lower':
                        newValue = lchangeVariableValue ? newValue.toLowerCase() : newValue
                        newName = lchangeVariableName ? newName.toLowerCase() : newName
                        break;

                    case 'upper':
                        newValue = lchangeVariableValue ? newValue.toUpperCase() : newValue 
                        newName = lchangeVariableName ? newName.toUpperCase() : newName
                        break;
                
                    default:
                        break;
                }

                tl.setTaskVariable(newName, newValue, element.secret);
                tl.setVariable(newName, newValue, element.secret);
            }
            console.log(newName + " => " + newValue);
        });
        tl.setResult(tl.TaskResult.Succeeded, 'DONE');
        
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();