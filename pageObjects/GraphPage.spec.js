const ExcelJS = require('exceljs');
const excelData = require('../utils/ExcelReaderUtil.spec');

class GraphPage {

    constructor(page) {
        this.page = page;       
        this.basicOpinListsLink = page.locator("[href='basic-operations-in-lists']");
        this.appOfArrayLink = page.locator("[href='applications-of-array']");
        this.practiceQueLink = page.locator("[href='/array/practice']");
        this.searchArrayLink = page.locator("[href='/question/1']");
        this.mostConOnesLink = page.locator("[href='/question/2']");
        this.findEvenNumLink = page.locator("[href='/question/3']");
        this.sqOfSortedArrayLink = page.locator("[href='/question/4']");
        this.tryEditorLink = page.locator('[href="/tryEditor"]');
        this.tryEditorTextarea = page.locator("//textarea[@tabindex='0']");
        this.tryEditorButton = page.locator('[type="button"]');
        this.submitButton = page.locator('[class="button"]');
        this.textOutput = page.locator('[id="output"]');
        this.signOut = page.locator('[href="/logout"]');
        this.practiceQuestionLink=page.locator("//a[normalize-space()='Practice Questions']");
    }

    async clickOnLink(linkName) {
        this.test = this.page.locator(`[href="${linkName}"]`);
        await this.test.waitFor();
        await this.test.click();

    }

    async getPageTitle() {
        return await this.page.title();
    }

    async clickTryButton() {
        await this.tryEditorLink.click();
    }

    async clearCodeFromEditor() {
        await this.tryEditorTextarea.waitFor();
        await this.tryEditorTextarea.press('Enter');
        await this.tryEditorTextarea.press('MetaLeft+KeyA+Backspace');
        //await this.tryEditorTextarea.clear();//did not work
    }
    async enterCode(code) {
        //await this.tryEditorTextarea.waitFor();//which one best to use
        console.log("🚀 ~ ArrayPage ~ enterCode ~ code:", typeof code)
        await this.page.waitForLoadState('networkidle');
        await this.tryEditorTextarea.fill(code);

    }


    async clickRunButton() {
        await this.tryEditorButton.click();
    }

    async clickSubmitButton() {
        await this.page.waitForLoadState('networkidle');
        await this.submitButton.click();

    }

    async getResult() {
        await this.textOutput.waitFor();
        const result = await this.textOutput.textContent();
        return result;
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


    async getErrorMsg() {
        let errormsg;
        await this.page.on('dialog', async dialog => {
            errormsg = dialog.message();
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
}
module.exports = { GraphPage };