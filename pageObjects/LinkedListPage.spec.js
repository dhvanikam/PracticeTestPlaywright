const { expect } = require('@playwright/test');
const config = require('../playwright.config.js');
const excelData = require('../utils/ExcelReaderUtil.spec');


class LinkedListPage{

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

//   async goToUrl()
//   {  
//    await this.page.goto(config.use.baseURL);
//   }
//   async loginValidCredentials(username,password)
//   {
//     await this.username.fill(username);
//     await this.password.fill(password);      
//     await this.submitButton.click();   
//     await this.page.waitForLoadState('networkidle');    
//   }  
//   async successLoginTextCheck(successLoginTextStr) {
//     const successText= await this.successLoginText.textContent();  
//      expect(await successText).toContain(successLoginTextStr) ;    
//  }
//  async selectStackOption()
//  { 
//   try{
//   await this.dropDown.click();    
//   await this.stackOption.click();   
//  await this.page.waitForLoadState('networkidle'); 
//   const expectedUrl="https://dsportalapp.herokuapp.com/stack/";
//   // await this.verifyUrl(expectedUrl);
//   const currentUrl = await this.page.url();
//     if (currentUrl !== expectedUrl) {
//       throw new Error(`URL mismatch: expected ${expectedUrl}, but got ${currentUrl}`);
//     }
//   } catch (error) {
//     console.error(`Error in selectStackOption: ${error.message}`);
//     throw error;
//   }
//   }

//  async verifyStackPageUrl()
//  {
//   await this.page.waitForTimeout(3000);
//   const title=await this.page.title();
//   return title;
//  }

// async clickMenuOption(menuoption)
// { 
//   const expectedUrl = `https://dsportalapp.herokuapp.com/stack/${menuoption}/`;
//   await this.page.locator(`[href="${menuoption}"]`).click();
//   await this.verifyUrl(expectedUrl);    
// }
// async enterCodeInTryEditor(pythonCode){
//   await this.tryEditorLink.click();
//   await this.tryEditorTextarea.fill(pythonCode);
//   await this.tryEditorButton.click();
//   const actualOutput=await this.textOutput.textContent()
//   return actualOutput;
// }

// async verifyUrl(expectedUrl)
// {
//     const currentUrl = await this.page.url();
//     expect(currentUrl).toBe(expectedUrl); 
// }

// async enterInvalidCodeInTryEditor(invalidPythonCode)
// {
//   await this.tryEditorLink.click();
//   await this.tryEditorTextarea.fill(invalidPythonCode);
// }
// async acceptAlert()
// {
//   this.page.on("dialog", async (dialog)=>
//   {    
//     await dialog.accept();
//   })  
//   await this.tryEditorButton.click();  
// }

// async logOut()
// {
//   await this.page.goBack();
//   await this.signOut.click();
// }

//**********common functions */
async clickOnLink(linkName) { 
  await this.page.locator(`[href="${linkName}"]`).click();
  console.log("clicked: ",linkName);
}

async getPageTitle() {
  return await this.page.title();
}

async clickTryButton() {
  console.log("clicked2");
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
  await this.page.waitForLoadState('networkidle'); 
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


module.exports={LinkedListPage};