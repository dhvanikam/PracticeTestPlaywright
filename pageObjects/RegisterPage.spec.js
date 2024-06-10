// @ts-ignore

const { randomFill } = require("crypto");
const util = require('../utils/util.spec')

class RegisterPage {

    constructor(page, pommanager) {
        this.page = page;
        this.pommanager = pommanager;
        this.username = page.locator("#id_username");
        this.password = page.locator("#id_password1");
        this.confirmpassword = page.locator("#id_password2");
        this.RegisterButton = page.locator("input[value='Register']");
        this.successRegisterText = page.locator("//*[@class='alert alert-primary']");
        //this.successRegisterText = page.getByText("div[role='alert']");
        this.errorMsgText = page.locator("div.alert.alert-primary");
        this.loginLink_down = page.getByRole('link', {name: 'Login '});
    }

    async clickLoginLink(){
        await this.loginLink_down.click();
        return this.pommanager.getSignInPage();
    }
    
    //Register with Valid Credentials
    async registerWithValidCredentials(username, password, confirmpassword) {
        username = username + util.getRandomInt(1000);
        
        await this.username.fill(username);
        await this.password.fill(password);
        await this.confirmpassword.fill(confirmpassword)
        await this.RegisterButton.click();
        return this.pommanager.getHomePage();
    }

    async successRegister() {
        
        await this.successRegisterText.waitFor()

        if (await this.successRegisterText.isVisible()) {
           
            return this.successRegisterText.textContent();

        }

    }

    //Register with Empty Fields
    async clickRegisterWithEmptyField(username, password, confirmpassword) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.confirmpassword.fill(confirmpassword)
        await this.RegisterButton.click();
    }

    async errorMsgInUsername()
    {
        await this.username.hover();
        this.tooltipText = await this.username.evaluate(node => node.validationMessage);
       // console.log('Tooltip text:', this.tooltipText);
        return this.tooltipText.trim();
    }

    async errorMsgInPassword()
    {
        await this.password.hover();
        this.tooltipText = await this.password.evaluate(node => node.validationMessage);
        //console.log('Tooltip text:', this.tooltipText);
        return this.tooltipText.trim(); 
    }

    async errorMsgInConfirmpassword()
    {
        await this.confirmpassword.hover();
        this.tooltipText = await this.confirmpassword.evaluate(node => node.validationMessage);
        //console.log('Tooltip text:', this.tooltipText);
        return this.tooltipText.trim();
    }

    //Register with InValid Credentials
    async clickRegisterWithInvalidCredentials(username, password, confirmpassword) {
        await this.username.fill(username);            
        await this.password.fill(password);   
        await this.confirmpassword.fill(confirmpassword)
        await this.RegisterButton.click();

        let actualErrText;

        if(await this.errorMsgText.isVisible())
        {
           actualErrText = await this.errorMsgText.textContent();           
        }
        return actualErrText.trim();

    }

}

module.exports = { RegisterPage };