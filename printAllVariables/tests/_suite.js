"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const assert = require("assert");
const ttm = require("azure-pipelines-task-lib/mock-test");
const allVariables = [
    {
        name: 'All.Value_Variables',
        value: 'This.IsTheValue.2',
        secret: false
    },
    {
        name: 'ThereisAnotheValue.2',
        value: 'This.IsTheValue.2',
        secret: false
    },
    {
        name: 'Super:Culture>This.2',
        value: 'SCMME0001LI002',
        secret: false
    }
];
describe('Sample task tests', function () {
    before(function () {
    });
    after(() => {
    });
    it('should succeed with simple inputs', function (done) {
        this.timeout(1000);
        let tp = path.join(__dirname, 'success.js');
        console.log(tp);
        let tr = new ttm.MockTestRunner(tp);
        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, true, 'should have succeeded');
        assert.equal(tr.warningIssues.length, 0, "should have no warnings");
        assert.equal(tr.errorIssues.length, 0, "should have no errors");
        console.log(tr.stdout);
        done();
    });
    it('it should fail if tool returns 1', function (done) {
        this.timeout(1000);
        let tp = path.join(__dirname, 'failure.js');
        let tr = new ttm.MockTestRunner(tp);
        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, false, 'should have failed');
        assert.equal(tr.warningIssues, 0, "should have no warnings");
        assert.equal(tr.errorIssues.length, 1, "should have 1 error issue");
        assert.equal(tr.errorIssues[0], 'Bad input was given', 'error issue output');
        assert.equal(tr.stdout.indexOf('Hello bad'), -1, "Should not display Hello bad");
        done();
    });
});
