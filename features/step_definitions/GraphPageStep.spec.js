const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');



Given('User is on Graph page after logged in to the portal',async function () {
  console.log(await this.page.title());
});
When('User clicks on {string} in Graph page',async function (linkName) {
  await this.graphPage.clickOnLink(linkName);
});
Then('User should be navigate to {string} in Graph page',async function (pageName) {
  await expect(this.page).toHaveTitle(pageName);
});

When('User clicks get started button for Graph after entering valid credential',async function () {
  this.loginPage=await this.homePage.clickSignInLink();
    this.homePage=await this.loginPage.validLogin("testuser@gmail.com", "R5h^w&Um3z5HPL");
    this.graphPage=await this.homePage.clickGetStartedOf_Graph();
});

When('User click the Try here button from {string} in Graph page from {string} of row  {string}',async function (string,sheetName, rowNumber) {
  const linkName = await this.graphPage.getLinkNameFromExcel(sheetName, rowNumber);
  await this.graphPage.clickOnLink(linkName);
  await this.graphPage.clickTryButton();
});

Then('User should be navigate to a page having an tryEditorr with a Run button to test in Graphpage',async  function () {
  await expect(this.page).toHaveTitle("Assessment");
});

When('User click the Try here button from {string} in Graphpage page from {string} of row  {string}',async function (string, sheetName, rowNumber) {
  const linkName = await this.graphPage.getLinkNameFromExcel(sheetName, rowNumber);
  await this.graphPage.clickOnLink(linkName);
  await this.graphPage.clickTryButton();
});

When('User clicks the run button after entering valid python code from from {string} of row  {string}',async function (sheetName, rowNumber) {
  await this.graphPage.enterCodefromExcel(sheetName, rowNumber);
  await this.graphPage.clickRunButton();
});

Then('User should be presented with run msg from {string} and {string} in Graphpage',async function (sheetName, rownum) {
  const result = await this.graphPage.getExpectedResultFromExcel(sheetName, rownum);
    expect(await this.graphPage.getResult()).toContain(result);
});

Then('User should be presented with errorrr message from sheet {string} and row {string} of in the popup box',async function (sheetName, rownum) {
  const errorMessage = await this.graphPage.getExpectedResultFromExcel(sheetName, rownum);
  expect(await this.graphPage.getErrorMsg()).toContain(errorMessage);
});


When('The user clicks on the Practice Questions button on the {string}  in Graphpage',async function (linkName) {
  await this.graphPage.clickOnLink(linkName);
  this.currentUrl=await this.graphPage.clickPracticeQuestionButton(); 
});

Then('The user should be directed to Practice Questions   in Graphpage which contains {string}',async function (linkName) {
  expect(await this.currentUrl).toMatch(new RegExp(`${linkName}$`));
});