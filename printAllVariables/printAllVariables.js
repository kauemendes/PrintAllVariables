"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const util_1 = require("util");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //do your actions
            // const allVariables = tl.getVariables()
            let typeVariableTransformation = tl.getInput("type_input_transform");
            let separatorIntoVariable = tl.getInput("separator_into_variable");
            if (util_1.isNullOrUndefined(separatorIntoVariable)) {
                separatorIntoVariable = '.';
            }
            const allVariables = [
                {
                    name: 'CVariable-Camel.Case1',
                    value: 'ValueCameCase1',
                    secret: false
                },
                {
                    name: 'AVARIABLE_UPPERCASE',
                    value: 'VALUEUPPERCASE1',
                    secret: false
                },
                {
                    name: '1variable-lowercase',
                    value: 'valuelowercase1',
                    secret: false
                }
            ];
            console.log(allVariables);
            var sortedArray = allVariables.sort((obj1, obj2) => {
                if (obj1.name > obj2.name) {
                    return 1;
                }
                if (obj1.name < obj2.name) {
                    return -1;
                }
                return 0;
            });
            console.log("All the variables in this format: [variable name] => value");
            sortedArray.forEach(element => {
                let newName = element.name.replace(/\_/g, separatorIntoVariable);
                newName = newName.replace(/\-/g, separatorIntoVariable);
                newName = newName.replace(/\./g, separatorIntoVariable);
                switch (typeVariableTransformation) {
                    case 'lower':
                        newName = newName.toLowerCase();
                        break;
                    case 'upper':
                        newName = newName.toUpperCase();
                        break;
                    default:
                        break;
                }
                tl.setTaskVariable(newName, element.value);
                tl.setVariable(newName, element.value);
                console.log(newName + " => " + element.value);
            });
            console.log(tl.getVariables());
            tl.setResult(tl.TaskResult.Succeeded, 'DONE');
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
