import tl = require('azure-pipelines-task-lib/task');

try {
    //do your actions
    const allVariables = tl.getVariables();
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
        console.log(newName + " => " + newValue);
    });
    tl.setResult(tl.TaskResult.Succeeded, 'DONE');
    
} catch (err) {
    tl.setResult(tl.TaskResult.Failed, (err as Error).message);
}