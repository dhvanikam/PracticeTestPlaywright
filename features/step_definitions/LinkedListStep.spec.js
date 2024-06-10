const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
//const { POManager } = require('../../pageObjects/POManager');



When('User clicks get started button for LinkedList after entering valid credential',async function () {
    this.loginPage=await this.homePage.clickSignInLink();
    this.homePage=await this.loginPage.validLogin("testuser@gmail.com", "R5h^w&Um3z5HPL");
    this.linkedListPage=await this.homePage.clickGetStartedOf_LinkedList();

  });

  // Given('User is on {string} page after logged in to the portal',async function(pageTitle)
  // {
  //   console.log(await this.page.title(),pageTitle);
  // });

  When('User clicks on {string} in LinkedList page',async function(linkName)
  {
    await this.linkedListPage.clickOnLink(linkName);
  });

  Then('User should be navigate to {string} in LinkedList page',async function(pageName)
  {
    await expect(this.page).toHaveTitle(pageName);
  });

  When('User click the Try here button from {string} in LinkedList page',async function (linkName) {
    await this.linkedListPage.clickOnLink(linkName);
    await this.linkedListPage.clickTryButton();
  });

  Then('User should be directed to a page having an tryEditorr with a Run button to test',async function () {
    await expect(this.page).toHaveTitle("Assessment");
  });

  
When('User clicks the run button after entering {string} in the tryEditorr page',async function (code) {
  await this.linkedListPage.enterCode(code);
  await this.linkedListPage.clickRunButton();
});

When('User clicks the run button after entering invalidcode{string} in the tryEditorr page',async function (code) {
  await this.linkedListPage.enterCode(code);
  this.errormsg=await this.linkedListPage.clickRunButtonwithInvalidCode();
});





Then('User should be presented with Run result as {string} in the console screen', async function (result) {
  expect(await this.linkedListPage.getResult()).toContain(result);
});

// Then('User should be presented with error message as {string} in the popupbox', async function (errorMessage) {
//   expect(this.errormsg).toContain(errorMessage);
// });

When('The user clicks on the Practice Questions button on the {string} in the LinkedList page',async function (linkName) {
  await this.linkedListPage.clickOnLink(linkName);
  this.currentUrl=await this.linkedListPage.clickPracticeQuestionButton(); 
});



Then('The user should be directed to Practice Questions  Page which contains {string} url',async function (linkName) {
 expect(await this.currentUrl).toMatch(new RegExp(`${linkName}$`));
});

When('User click the Try here button from {string} in LinkedList page from {string} of rownumber {string}',async function (links,sheetName, rowNumber) {
  const linkName = await this.linkedListPage.getLinkNameFromExcel(sheetName, rowNumber);
  console.log(sheetName, rowNumber,linkName);
    await this.linkedListPage.clickOnLink(linkName);
    console.log("clicked1");
    await this.linkedListPage.clickTryButton();
});

When('User click the Try here button from {string} in LinkedList page from {string} and row {string}',async function (string, sheetName, rowNumber) {
  const linkName = await this.linkedListPage.getLinkNameFromExcel(sheetName, rowNumber);
  console.log(linkName);
  await this.linkedListPage.clickOnLink(linkName);
  console.log(linkName,"im clicked");
  await this.linkedListPage.clickTryButton();
  console.log(linkName, "im linked");
});

When('User clicks the run button after entering valid python code in the tryEditorr page from {string} and row {string}',async function (sheetName, rowNumber) {
  await this.linkedListPage.enterCodefromExcel(sheetName, rowNumber);
    await this.linkedListPage.clickRunButton();
});

Then('User should be presented with Run result from {string} and row {string}',async function (sheetName, rownum) {
  const errorMessage = await this.linkedListPage.getExpectedResultFromExcel(sheetName, rownum);
    expect(await this.linkedListPage.getErrorMsg()).toContain(errorMessage);
});

Then('User should be presented with Run message from {string} and row {string}',async function (sheetName, rownum) {
  const result = await this.linkedListPage.getExpectedResultFromExcel(sheetName, rownum);
    expect(await this.linkedListPage.getResult()).toContain(result);
});
Then('User should be presented with Errorr Message from sheet {string} and row {string} of  in the popup box',async function (sheetName, rownum) {
  const errorMessage = await this.linkedListPage.getExpectedResultFromExcel(sheetName, rownum);
  expect(await this.linkedListPage.getErrorMsg()).toContain(errorMessage);
});