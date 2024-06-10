const ExcelJS = require('exceljs');
const excelData = require('../utils/ExcelReaderUtil.spec');
class QueuePage
{
    constructor(page)
    {
        this.page = page;
        
        this.dropDown = page.getByRole('link', { name: 'Data Structures' });
        this.queueLink = page.locator("a[href='/queue']");
        this.queuePhyton = page.locator("//a[@href='implementation-lists']");
        this.queueCollection = page.locator("//a[@href='implementation-collections']");
        this.queueArray = page.locator("//a[@href='Implementation-array']");
        this.queueOperation = page.locator("//a[@href='QueueOp']");
        this.practiceQuestion = page.locator("//a[@href='/queue/practice']");

        this.tryEditorLink = page.locator("a[href='/tryEditor']");
        this.tryEditorTextarea = page.locator("//textarea[@tabindex='0']");
        this.runButton = page.getByRole("button",{name: "Run"});
        this.textOutput=page.locator("[id='output']");
        this.submitButton = page.locator('[class="button"]');
    }

    async clickOnLink(linkName)
    {
        this.test = this.page.locator(`[href="${linkName}"]`);
        await this.test.waitFor();
        await this.test.click();
    }

    async clickTryButton()
    {
        await this.tryEditorLink.click();
    }

    async enterCode(code)
    {
        console.log(code);
        //await this.tryEditorTextarea.waitFor();
        await this.page.waitForLoadState('networkidle');
        await this.tryEditorTextarea.fill(code);
    }

    async clickRunButton()
    {
        await this.runButton.click();
    }

    async clickSubmitButton() {
        await this.page.waitForLoadState('networkidle');
        await this.submitButton.click();

    }

    async getResult()
    {
        await this.textOutput.waitFor();
        const result = await this.textOutput.textContent();
        return result;
    }
 
     async getErrorMsg()
     {
         let errormsg;
         await this.page.on('dialog', async dialog => {
             errormsg=dialog.message();
             console.log(errormsg);
             dialog.accept();
         });
         await this.runButton.waitFor();
         await this.runButton.click();
         return errormsg;
    }

     async clickQueueOperationLink()
    {
        await this.queueOperation.click();
    }

    async clickPracticeQuestion()
    {
        await this.practiceQuestion.click();
    }

    async getPageNameFromExcel(sheetName, rowNumber) {
        const output = await excelData.readExcel(sheetName);     
        const linkName = output[rowNumber].get('pagename');
        return linkName;
    }
    async getLinkNameFromExcel(sheetName, rowNumber) {
        const output = await excelData.readExcel(sheetName);     
        const linkName = output[rowNumber].get('links');
        return linkName;
    }
    async getExpectedResultFromExcel(sheetName, rowNumber) {
        const output = await excelData.readExcel(sheetName);     
        const expectedResult = output[rowNumber].get('Result');
        return expectedResult;
    }

    async enterCodefromExcel(sheetName, rowNumber) {
        const output = await excelData.readExcel(sheetName);
        const code = output[rowNumber].get('pythonCode');
        await this.page.waitForLoadState('networkidle');
        await this.tryEditorTextarea.fill(code);
    }

}
module.exports= {QueuePage};