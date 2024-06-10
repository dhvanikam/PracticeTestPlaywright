const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');




When('User clicks get started button for stack after entering valid credential',async function () {
    this.loginPage=await this.homePage.clickSignInLink();
    this.homePage=await this.loginPage.validLogin("testuser@gmail.com", "R5h^w&Um3z5HPL");
    this.stackPage=await this.homePage.clickGetStartedOf_Stack();
  });

  Given('User is on {string} page after logged in to the portal',async function(pageTitle)
  {
    console.log(await this.page.title());
  });

  When('User clicks on {string} in stack page',async function(linkName)
  {
    await this.stackPage.clickOnLink(linkName);
  });

  Then('User should be navigate to {string} in stack page',async function(pageName)
  {
    await expect(this.page).toHaveTitle(pageName);
  });

  
  When('User click the Try here button from {string} in stack page from {string} of sheet {string}',async function (string, rowNumber, sheetName) {
    const linkName = await this.stackPage.getLinkNameFromExcel(sheetName, rowNumber);
    await this.stackPage.clickOnLink(linkName);
    await this.stackPage.clickTryButton();
  });

  Then('User should be navigate to a page having an tryEditorr with a Run button to test',async function () {
    await expect(this.page).toHaveTitle("Assessment");
  });

  
When('User clicks the run button after entering {string} in the tryEditorr',async function (code) {
   await this.stackPage.enterCode(code);
    await this.stackPage.clickRunButton();
});

When('User clicks the run button after entering invalid python code {string} in the tryEditorr',async function (code) {
  await this.stackPage.enterCode(code);
  this.errorMessage=await this.stackPage.clickRunButtonwithInvalidCode();
});

When('User clicks the run button after entering valid python code from row {string} of sheet {string}',async function (rowNumber, sheetName) {
  await this.stackPage.enterCodefromExcel(sheetName, rowNumber);
  await this.stackPage.clickRunButton();
});


// Then('User should be presented with Run result as {string} in the console', async function (result) {
//   expect(await this.stackPage.getResult()).toContain(result);
// });

Then('User should be presented with error message as {string} in the popup box', async function (errorMessage) {
  expect(await this.errorMessage).toContain(errorMessage);
});

When('The user clicks on the Practice Questions button on the {string} page',async function (linkName) {
  await this.stackPage.clickOnLink(linkName);
  this.currentUrl=await this.stackPage.clickPracticeQuestionButton(); 
});



Then('The user should be directed to Practice Questions  Page which contains {string}',async function (linkName) {
 expect(await this.currentUrl).toMatch(new RegExp(`${linkName}$`));
});




Then('User should be presented with error message from sheet {string} and row {string} of  in the popup box',async function (sheetName, rownum) {
  const errorMessage = await this.stackPage.getExpectedResultFromExcel(sheetName, rownum);
  expect(await this.stackPage.getErrorMsg()).toContain(errorMessage);
});

Then('User should be presented with run msg from {string} and {string}',async function (sheetName, rownum) {
  const result = await this.stackPage.getExpectedResultFromExcel(sheetName, rownum);
    expect(await this.stackPage.getResult()).toContain(result);
});
