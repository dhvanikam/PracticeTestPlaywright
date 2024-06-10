const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// @data-structure-links-navigation
When('User clicks get started for data structure after entering valid credential', async function () {
    this.loginPage = await this.homePage.clickSignInLink();
    this.homePage = await this.loginPage.validLogin("testuser@gmail.com", "R5h^w&Um3z5HPL");
    this.datastructurePage = await this.homePage.clickGetStartedOf_DataStructure();
});

Given('User is on Data Structures page after logged in', async function () {
    console.log(await this.page.title());
});

When('User clicks on {string} for Data Structures page', async function (linkName) {
    await this.datastructurePage.clickOnLink(linkName);
});

Then('User should be navigate to {string} page Data Structures page', async function (pageName) {
    await expect(this.page).toHaveTitle(pageName);
});

//@data-structure-practiceQuetionsLink-navigation
When('User click the practice question button from {string} page for Data Structures page', async function (linkName) {
    await this.datastructurePage.clickOnLink(linkName);
    await this.datastructurePage.clickOnLink("/data-structures-introduction/practice");
});

Then('User should be navigate to a page having {string} for Data Structures page', async function (pageTitle) {
    await expect(this.page).toHaveTitle(pageTitle);
});

//@data-structure-tryeditor-navigation
When('User click the Try here button from {string} page from {string} of sheet {string} for Data Structures page', async function (string, rowNumber, sheetName) {
    const linkName = await this.datastructurePage.getLinkNameFromExcel(sheetName, rowNumber);
    await this.datastructurePage.clickOnLink(linkName);
    await this.datastructurePage.clickTryButton();
});


Then('User should be navigate to a page having an tryEditor with a Run button to test for Data Structures page', async function () {
    await expect(this.page).toHaveTitle("Assessment");
});

// @data-structure-tryeditor-validcode
When('User clicks the run button after entering code in tryEditor from row {string} of sheet {string} for Data Structures page', async function (rowNumber, sheetName) {
    await this.datastructurePage.enterCodefromExcel(sheetName, rowNumber);
    await this.datastructurePage.clickRunButton();
});

Then('User should be presented with Run result from row {string} of sheet {string} for Data Structures page', async function (rowNumber, sheetName) {
    const result = await this.datastructurePage.getExpectedResultFromExcel(sheetName, rowNumber);
    expect(await this.datastructurePage.getResult()).toContain(result);
});


Then('User should be presented with error message from row {string} of sheet {string} for Data Structures page', async function (rowNumber, sheetName) {
    const errorMessage = await this.datastructurePage.getExpectedResultFromExcel(sheetName, rowNumber);
    expect(await this.datastructurePage.getErrorMsg()).toContain(errorMessage);
});
