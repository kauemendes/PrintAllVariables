import tl = require('azure-pipelines-task-lib/task');
import { isNullOrUndefined } from 'util';

async function run() {
    try {
        //do your actions
        const allVariables = tl.getVariables();
        let typeVariableTransformation = tl.getInput("type_input_transform");
        let separatorIntoVariable = tl.getInput("separator_into_variable");

        if (isNullOrUndefined(separatorIntoVariable)) {
            separatorIntoVariable = '.'
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
        console.log("All the variables in this format: [variable name] => value")
        sortedArray.forEach(element => {
            let newName = element.name.replace(/\_/g, separatorIntoVariable);
            newName = newName.replace(/\-/g, separatorIntoVariable);
            newName = newName.replace(/\./g, separatorIntoVariable);
            
            switch (typeVariableTransformation) {
                case 'lower':
                    newName = newName.toLowerCase()
                    break;

                case 'upper':
                    newName = newName.toUpperCase()
                    break;
            
                default:
                    break;
            }

            tl.setTaskVariable(newName, element.value);
            tl.setVariable(newName, element.value);
            console.log(newName + " => " + element.value);
        });
        tl.setResult(tl.TaskResult.Succeeded, 'DONE');
        
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();