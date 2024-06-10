const config = require('../playwright.config');
class HomePage{

    constructor(page,pommanager){
        
        this.page = page;

        //dropdown locators
        this.pommanager = pommanager;
        this.textLogo = page.locator(".navbar-brand");
        this.dropdownEle = page.locator(".dropdown");
        this.defaultDropdownOption = page.locator(".nav-link.dropdown-toggle");
        this.dropdownMenuSection = page.locator(".dropdown-menu.show");
        this.menuOptions = page.locator(".dropdown-menu.show a");

        //error msg locator
        this.errMsg = page.locator("div[role='alert']");

        //successMsg Locator for SignIn
        this.successLoginText = page.locator("div.alert.alert-primary");

        //link locators
        this.registerLink = page.locator("//a[normalize-space()='Register']");
        this.signInLink = page.locator("//a[normalize-space()='Sign in']");
        this.signOut = page.locator("a[href='/logout']");

        //get started buttons for each modules
        this.dsIntroBtn = page.locator("//a[@href='data-structures-introduction']");
        this.arrayBtn = page.locator("//a[@href='array']");
        this.linkedListBtn = page.locator("a[href='linked-list']");
        this.stackBtn = page.locator("a[href='stack']");
        this.queueBtn = page.locator("a[href='queue']");
        this.treeBtn = page.locator("a[href='tree']");
        this.graphBtn = page.locator("a[href='graph']");

        this.allGetStartedBtn = page.locator(".card-body.d-flex.flex-column a");

        //module name locator
        this.moduleTexts = page.locator('.card-title');
        
    }

    /*********** DropDown methods *****************/
    async isDropDOwnVisible(){
        return await this.dropdownEle.isVisible();  
    }

    getDefaultDropDownOptionEle(){
        return this.defaultDropdownOption;
    }

    async clickOnDropDOwn(){
        await this.dropdownEle.click();
        return await this.dropdownMenuSection.isVisible();
    }

    async clickEachOptionAndGetErrMsg(){

        //get all the options in an array
        let menuArray = await this.menuOptions;
        const optionCount = await menuArray.count();

        //initializa an empty array
        let errMsgArray=[];        

        //iterate and click on each options and get the error msg
        for (let i=0; i<optionCount; i++){

            await menuArray.nth(i).click();
        
            if(await this.errMsg.isVisible()){
                let text = await this.errMsg.textContent()
                errMsgArray.push(text.trim());
            }

            await this.dropdownEle.click();

          } 
        
        return errMsgArray;
    }

    async getAllDropdownOptionMenuTexts(){

        let menuArray = await this.menuOptions;
        const optionCount = await menuArray.count();

        let optionMenuArray=[]; 
        for (let i=0; i<optionCount; i++){
            let text = await menuArray.nth(i).textContent();
            optionMenuArray.push(text.trim());
        }
        return optionMenuArray;
    }

    async getMenuOptionCount(){
        let menuArray = await this.menuOptions;
        const count = await menuArray.count();

        return count;
    }


    /*********** Link action methods *****************/

  async goToUrl() 
  {  
   await this.page.goto(config.use.baseURL);
  }

    async isRegisterLinkVisible(){
        return await this.registerLink.isVisible();
    }

    async clickRegisterLink(){
        await this.registerLink.click();
        await this.page.waitForLoadState('networkidle');
        return this.pommanager.getRegisterPage();
    }

    async isSignInLinkVisible(){
        return await this.signInLink.isVisible();
    }

    async clickSignInLink(){
        await this.signInLink.click();
        return this.pommanager.getSignInPage();
    }

    async isSignOutLinkVisible(){
        return await this.signOut.isVisible();
    }

    async clickSignOutLink(){
        await this.signOut.click();
    }
    
    /**************************Success Msg Alert For Login ******************/
    async successLogin() 
    {
        if(await this.successLoginText.isVisible())
        {
           const successTxt = await this.successLoginText.textContent();
           console.log(successTxt.trim())
           return successTxt.trim();
        }      
    }
    

    /*********** Module methods *****************/

    async clickGetStartedOf_DataStructure(){
        await this.dsIntroBtn.click();
        return this.pommanager.getDataStructurePage(); //Added by Dhvani 
    }

    async clickGetStartedOf_Array(){
        await this.arrayBtn.click();
        return this.pommanager.getArrayPage();      
    }

    async clickGetStartedOf_LinkedList(){
        await this.linkedListBtn.click();
        return this.pommanager.getLinkedListPage();
    }
    async clickGetStartedOf_Stack(){
        await this.stackBtn.click();
        return this.pommanager.getStackPage();
    }
    async clickGetStartedOf_Queue(){
        await this.queueBtn.click();
        return this.pommanager.getQueuePage();
    }
    async clickGetStartedOf_Tree(){
        await this.treeBtn.click();
        return this.pommanager.getTreePage();
    }
    async clickGetStartedOf_Graph(){
        await this.graphBtn.click();
        return this.pommanager.getGraphPage();
    }


    async getAllModuleNames(){

        let moduleArray = await this.moduleTexts;
        const moduleCount = await moduleArray.count();

        let moduleTextArray=[]; 
        for (let i=0; i<moduleCount; i++){
            let text = await moduleArray.nth(i).textContent();
            moduleTextArray.push(text.trim());
        }
        return moduleTextArray;
    }

    async getAllModuleCount(){
        return await this.moduleTexts.count();
    }

    async clickGetStartedBtnEachModuleAndGetErrMsg(){

        //get all getStarted Btns in an array
        let btnArray = await this.allGetStartedBtn;
        const btnCount = await btnArray.count();

        let errMsgArray=[];        

        for (let i=0; i<btnCount; i++){

            await btnArray.nth(i).click();
        
            if(await this.errMsg.isVisible()){
                let text = await this.errMsg.textContent()
                errMsgArray.push(text.trim());
            }

            //reinitialize
            btnArray = await this.allGetStartedBtn;

          } 
        
        return errMsgArray;
    }
}

module.exports = {HomePage};