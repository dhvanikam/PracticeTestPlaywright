const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

//Background Scenario
When('User clicks get started for queue after entering valid credential', async function () 
{
  this.loginPage=await this.homePage.clickSignInLink();
  this.homePage=await this.loginPage.validLogin("TestUser", "Pass@123");
  this.queuePage=await this.homePage.clickGetStartedOf_Queue();
});

When('User clicks on queue {string}', async function (linkName) 
{
  await this.queuePage.clickOnLink(linkName);
});

When('User click the Try here button for Queue page from {string} page', async function (linkName)
{
  await this.queuePage.clickOnLink(linkName);
  await this.queuePage.clickTryButton();
});

//Enter Python Code
When('User clicks the run button after entering {string} in tryEditor for Queue page', async function (code)
{
  await this.queuePage.enterCode(code);
  await this.queuePage.clickRunButton();
});

//Valid Output
Then('User should be presented with Run result as {string} in Queue page', async function (result)
{
  expect(await this.queuePage.getResult()).toContain(result);
});

//Invalid Output
Then('User should be presented with error message as {string} in Queue page', async function (errorMessage) 
{
  expect(await this.queuePage.getErrorMsg()).toContain(errorMessage);
});

//Practice Questions
When('User clicks Practice Questions after reaching to QueueOp page', async function () 
{
  await this.queuePage.clickQueueOperationLink();
  await this.queuePage.clickPracticeQuestion();
});

Then('User is directed to Practice page', async function () 
{
  await expect(this.page).toHaveTitle("Practice Questions")
});

//Excel- Python Code
When('User click the Try here button for Queue page from {string} page from {string} of sheet {string}', async function (string, rowNumber, sheetName) {
  const linkName = await this.queuePage.getLinkNameFromExcel(sheetName, rowNumber);
  console.log(linkName);
  await this.queuePage.clickOnLink(linkName);
  await this.queuePage.clickTryButton();
});

When('User clicks the run button after entering code in tryEditor for Queue page from row {string} of sheet {string}', async function (rowNumber, sheetName) {
  await this.queuePage.enterCodefromExcel(sheetName, rowNumber);
  await this.queuePage.clickRunButton();
});

Then('User should be presented with Run result for Queue page from row {string} of sheet {string}', async function (rowNumber, sheetName) {
  const result = await this.queuePage.getExpectedResultFromExcel(sheetName, rowNumber);
  expect(await this.queuePage.getResult()).toContain(result);
});

Then('User should be presented with error message for Queue page from row {string} of sheet {string}', async function (rownum, sheetName) {
  const errorMessage = await this.queuePage.getExpectedResultFromExcel(sheetName, rownum);
  expect(await this.queuePage.getErrorMsg()).toContain(errorMessage);
});
