/**
 This file rewrite global Jasmine BDD framework for better control
 **/

var protractor = require('protractor');
var EC = protractor.ExpectedConditions;
var chalk = require('chalk');

var rawIt = GLOBAL.it;
var rawDescribe = describe;

/**
 * Rewrite global Jasmine BDD framework for better control
 * @param caseTitle
 * @param {string} sectionId - The page part name or component feature to test. Say 'Dashboard/List', 'Cool Form Editor'
 * @param caseFunction
 * @param caseRunningTimeout
 */
GLOBAL.it = function (caseTitle, sectionId, caseFunction, caseRunningTimeout) {
  if (!sectionId || typeof sectionId !== 'string') {
    console.warn(chalk.red('[WARN][jasmine.it] section id is required. Skip adding case:"', caseTitle, '"'));
    return;
  }

  var finalCaseTitle = '[' + sectionId + '] ' + caseTitle;

  var caseType = browser.params.casetype;
  if (caseType) {
    if (!sectionId.match(caseType)) {
      console.warn(
        chalk.yellow('[INFO][jasmine.it] Skip case for type-no-match.'),
        chalk.blue(' Case type:'),
        chalk.blue.underline(caseType),
        chalk.green(' Case title:'),
        chalk.green.underline(caseTitle),
        chalk.blue(' Section Id:'),
        chalk.blue.underline(sectionId)
      );

      return;
    }
  }

  var caseName = browser.params.casename;
  if (caseName) {
    console.warn(
      chalk.green('Start to Run test cases that match title'),
      chalk.red.underline(caseName)
    );
    if (!finalCaseTitle.match(caseName)) {

      return;
    }
  }

  rawIt.call(this, finalCaseTitle,
    function () {
      var assertionAmount = /expect\(/.exec(caseFunction.toString()).length;
      console.log(
        chalk.green('[INFO] Executing case: '),
        chalk.green.underline.bold(finalCaseTitle),
        chalk.blue('assertion amount: ' + assertionAmount || 0));
      caseFunction.apply(this, arguments)
    },
    caseRunningTimeout);
};
