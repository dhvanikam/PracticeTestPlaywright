
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const {POManager} = require('../../pageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../../testData/RegisterValidTestData.json')));
const excel = require('../../utils/ExcelReaderUtil.spec');
const util = require('../../utils/util.spec');

//########################################### Login Link in Register Page ############################################################

When('User clicks on Login link on Register Page', async function () {
  this.signInPage = await this.registerPage.clickLoginLink();
});

//########################################### Register With Valid Data from JSON File #################################################

  When('User logs in with valid credentials from {string}', async function (datasetNumber) {
    
    const username = dataset[datasetNumber-1].username
    const password = dataset[datasetNumber-1].password
    const confirmpassword = dataset[datasetNumber-1].confirmpassword
    
    this.homePage = await this.registerPage.registerWithValidCredentials(username, password, confirmpassword);
    
  });


  Then('User navigate to the home page with a message {string}', {timeout: 100*1000}, async function (expectedErrMsg) {
    
    expect(await this.registerPage.successRegister()).toBeVisible;
  
    expect(await this.registerPage.successRegister()).toContain("New Account Created"); 
  
  });


//########################################### Invalid Credentials - Data from Excel ######################################################

  //Passing SheetName and Row Number
  When('user enters invalid credentials in the sheetname {string} and row number {int}', {timeout: 100000}, async function (sheetName, rowNum) {
    
    let data = await excel.getRegistrationData(sheetName,rowNum);
    console.log(data)
    this.actualErrMsgArray=[];
    this.actualErrMsgArray.push(await this.registerPage.clickRegisterWithInvalidCredentials(data[0].username, data[0].password, data[0].confirmpassword));      

  });

  //Passing only SheetName
  When('user enters invalid credentials in the sheetname {string}', {timeout: 100000}, async function (sheetName) {
    
    let dataSet = await excel.getRegistrationData(sheetName, null);
    console.log(dataSet)
    const x = [];
    
    for(const data of dataSet){
      let actualErrText = await this.registerPage.clickRegisterWithInvalidCredentials(data.username, data.password, data.confirmpassword);      
      
      x.push(await actualErrText);

    }
    this.actualErrMsgArray = x;
    console.log(this.actualErrMsgArray)

  })

  Then('User verifies for the mismatch error message {string}', function (expectedErrMsg) {

    expect(util.checkActualEveryErrMsgToEquate(this.actualErrMsgArray,expectedErrMsg)).toBeTruthy();

  });
  

//########################################### Atleast one empty field - Data from Excel ##############################################################

When('The user clicks Register button with atleast one empty field in the sheetname {string} and row number {int}', async function (sheetName, rowNum) {      
  let data = await excel.getRegistrationData(sheetName, rowNum);
  console.log(data);

  const username = data[0].username;
  const password = data[0].password;
  const confirmpassword = data[0].confirmpassword;

  this.errMsgArray = [];

  //only username is null
  if(username === "null" && password !=="null" && confirmpassword !== "null"){
    
    await this.registerPage.clickRegisterWithEmptyField("", password, confirmpassword);
    this.errMsgArray.push(await this.registerPage.errorMsgInUsername());
  }
  //username and confirm password are null
  else if(username === "null" && password !== "null" && confirmpassword === "null"){
    
    await this.registerPage.clickRegisterWithEmptyField("", password, "");
    this.errMsgArray.push(await this.registerPage.errorMsgInUsername());
  }
  //username and password are null
  else if(username === "null" && password === "null" && confirmpassword !== "null"){
    
    await this.registerPage.clickRegisterWithEmptyField("", "", confirmpassword);
    this.errMsgArray.push(await this.registerPage.errorMsgInUsername());
  }
  //all fields are empty
  else if(username === "null" && password === "null" && confirmpassword === "null"){
    
    await this.registerPage.clickRegisterWithEmptyField("", "", "");
    this.errMsgArray.push(await this.registerPage.errorMsgInUsername());
  }
  //password and confirm password are empty
  else if(username !== "null" && password === "null" && confirmpassword === "null"){

    await this.registerPage.clickRegisterWithEmptyField(username, "", "");
    
    this.errMsgArray.push(await this.registerPage.errorMsgInPassword());
  }
  //confirm password is null only
  else if(username !== "null" && password !== "null" && confirmpassword === "null"){
    await this.registerPage.clickRegisterWithEmptyField(username, password, "");
    this.errMsgArray.push(await this.registerPage.errorMsgInConfirmpassword());
  }
    
});

Then('It should display an error {string} underneath one of the fields', async function (expectedErrMsg) {
  expect(await util.checkActualEveryErrMsgToEquate(this.errMsgArray,expectedErrMsg)).toBeTruthy();
});

  