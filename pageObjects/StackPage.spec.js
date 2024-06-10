const { expect } = require('@playwright/test');
const config = require('../playwright.config.js');
const ExcelJS = require('exceljs');
const excelData = require('../utils/ExcelReaderUtil.spec');


class StackPage{

  constructor(page,pommanager)
  {
    this.page=page;
    this.pommanager = pommanager;
    //locators
    this.username=page.locator('[name="username"]');
    this.password=page.locator("[name='password']");
    this.submitButton=page.locator("[type='submit']");
    this.successLoginText = page.locator("div.alert.alert-primary");
    this.dropDown=page.locator('[data-toggle="dropdown"]');
    this.stackOption=page.locator('[href="/stack"]');
    this.operationInStackLink=page.locator('[href="operations-in-stack"]');
    this.implementationInStackLink=page.locator('[href="implementation"]');
    this.applicationsInStackLink=page.locator('[href="stack-applications"]');
    this.tryEditorLink=page.locator('[href="/tryEditor"]');
    this.tryEditorTextarea=page.locator("//textarea[@tabindex='0']");
    this.tryEditorButton=page.locator('[type="button"]');
    this.textOutput=page.locator('[id="output"]');
    this.signOut=page.locator('[href="/logout"]');
    this.practiceQuestionLink=page.locator("//a[normalize-space()='Practice Questions']");
  }

 


async clickOnLink(linkName) {
  await this.page.locator(`[href="${linkName}"]`).click();
}

async getPageTitle() {
  return await this.page.title();
}

async clickTryButton() {
  await this.tryEditorLink.click();
}

async enterCode(code) {
  console.log(code);
  //await this.tryEditorTextarea.waitFor();
  await this.page.waitForLoadState('networkidle');
  await this.tryEditorTextarea.fill(code);
}

async clickRunButton(){
  await this.tryEditorButton.click();
}

async getResult(){
 const result = await this.textOutput.textContent();
 return result;
}

async getErrorMsg(){
  let errormsg;
  await this.page.on('dialog', async dialog => {
      errormsg=dialog.message();
      console.log(errormsg);
      dialog.accept();
  });
  await this.tryEditorButton.waitFor();
  await this.tryEditorButton.click();
  return errormsg;
}

async clickPracticeQuestionButton()
{
  await this.practiceQuestionLink.click(); 
  const currentUrl = await this.page.url();
  return currentUrl;
}

async clickRunButtonwithInvalidCode()
{
  let errormsg;
  await this.page.on('dialog', async dialog => {
      errormsg=dialog.message();
      console.log(errormsg);
      dialog.accept();
  });
  await this.tryEditorButton.waitFor();
  await this.tryEditorButton.click();
  return errormsg;

}

async getLinkNameFromExcel(sheetName, rowNumber) {
  const output = await excelData.readExcel(sheetName);     
  const linkName = output[rowNumber].get('links');
  return linkName;
}

async enterCodefromExcel(sheetName, rowNumber) {
  const output = await excelData.readExcel(sheetName);
  const code = output[rowNumber].get('pythonCode');
  await this.page.waitForLoadState('networkidle');
  await this.tryEditorTextarea.fill(code);
}

async getExpectedResultFromExcel(sheetName, rowNumber) {
  const output = await excelData.readExcel(sheetName);   
  const expectedResult = output[rowNumber].get('Result');
  return expectedResult;
}


}


module.exports={StackPage};