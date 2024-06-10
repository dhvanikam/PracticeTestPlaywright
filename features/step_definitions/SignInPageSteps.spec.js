
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');
const excel = require('../../utils/ExcelReaderUtil.spec');
const util = require('../../utils/util.spec');

//################################ Register Link ######################################################

When('User clicks on Register link', async function () {
   this.registerPage = await this.signInPage.clickRegisterLink();
});

//################################ Login with Valid Credentials ######################################################

When('User enters valid username {string} and password {string} and clicks on login button', async function (username, password) {

  this.homePage = await this.signInPage.validLogin(username, password);
});

Then('User navigates to the home page with a message {string}', async function (expctedSuccessMsg) {

  expect(await this.homePage.successLogin()).toBe(expctedSuccessMsg);
   
});

//########################################### Invalid Login Credentials - Data from Excel ##############################################################

When('user enters invalid login credentials in the sheetname {string} and row number {int} and clicks login button', async function (sheetName, rowNum) {     

  let data = await excel.getLoginData(sheetName, rowNum);
  console.log(data); 
  this.actualErrMsgArray = [];
  this.actualErrMsgArray.push(await this.signInPage.clickLoginWithInvalidCredentials(data[0].username, data[0].password));
  console.log(this.actualErrMsgArray);
});

Then('User verify the message {string}.', function (expectedErrMsg) {
   expect(util.checkActualEveryErrMsgToEquate(this.actualErrMsgArray, expectedErrMsg)).toBeTruthy();
});

  
//########################################### Atleast one empty field - Data from Excel ##############################################################
  
When('User clicks on login button with atleast one empty field in the sheetname {string} and row number {int}', async function (sheetName, rowNum) {
   
    let data = await excel.getLoginData(sheetName, rowNum);

    const username = data[0].username;
    const password = data[0].password;
    this.errMsgArray = [];

    //Both username and password are empty
    if(username ==="null" && password==="null"){
      await this.signInPage.clickLoginWithEmptyField("", "");
      
      this.errMsgArray.push(await this.signInPage.errorMsgForEmptyField());
    }
    //username empty
    else if(username ==="null" && password !=="null"){
      console.log("inside correct block")
      await this.signInPage.clickLoginWithEmptyField("", password);
      this.errMsgArray.push(await this.signInPage.errorMsgForEmptyField());
    }
    //password empty
    else if(username !=="null" && password ==="null"){
      await this.signInPage.clickLoginWithEmptyField(username, "");
      this.errMsgArray.push(await this.signInPage.errorMsgForEmptyPassword());
    }
});

Then('User verify the message {string} underneath one of the fields', async function (expectedErrMsg) {
    expect(await util.checkActualEveryErrMsgToEquate(this.errMsgArray,expectedErrMsg)).toBeTruthy();
});

