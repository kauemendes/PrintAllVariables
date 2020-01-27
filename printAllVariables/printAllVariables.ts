import tl = require('azure-pipelines-task-lib/task');
import { isNullOrUndefined } from 'util';

async function run() {
    try {
        //do your actions
        const allVariables = tl.getVariables();
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
        console.log("INFO: All the variables in this format: [variable name] => value")
        sortedArray.forEach(element => {
            let newValue = element.value;
            let newName = element.name;

            if (!isNullOrUndefined(separatorIntoVariable)) {
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
                    if(!element.secret) newValue = newValue.toLowerCase()
                    newName = newName.toLowerCase()
                    break;

                case 'upper':
                    if(!element.secret) newValue = newValue.toUpperCase()
                    newName = newName.toUpperCase()
                    break;
            
                default:
                    break;
            }

            tl.setTaskVariable(newName, newValue, element.secret);
            tl.setVariable(newName, newValue, element.secret);
            if(element.secret) console.log(">>>>>> This is a SECRET, value not changed <<<<<<");
            console.log(newName + " => " + newValue);
        });
        tl.setResult(tl.TaskResult.Succeeded, 'DONE');
        
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();