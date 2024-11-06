"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
try {
    const allVariables = tl.getVariables();
    var sortedArray = allVariables.sort((obj1, obj2) => {
        if (obj1.name > obj2.name) {
            return 1;
        }
        if (obj1.name < obj2.name) {
            return -1;
        }
        return 0;
    });
    console.log("INFO: All the variables in this format: [variable name] => value");
    sortedArray.forEach(element => {
        let newValue = element.value;
        let newName = element.name;
        console.log(newName + " => " + newValue);
    });
    tl.setResult(tl.TaskResult.Succeeded, 'DONE');
}
catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
}
//# sourceMappingURL=printAllVariables.js.map