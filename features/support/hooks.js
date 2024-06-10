const { Before, After, Status, AfterStep } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');

let browser;
let context;
let scenarioName;

Before(async function (scenario) {
  this.scenarioName = scenario.pickle.name;
  console.log(this.scenarioName);
});

Before({ timeout: 100 * 1000 }, async function () {
  const browserName = this.parameters["browser"];
  // const project = this.parameters["projects"];
  // const browserName = project[0].name;
  const browserHeight = this.parameters["height"];
  const browserWidth = this.parameters["width"];
  
  console.log("🚀 ~ browserName:", browserName)
  if(browserName==='firefox'){
    this.browser = await playwright.firefox.launch({
      headless: false,
    });
  }
  else if(browserName==='chromium'){
    this.browser = await playwright.chromium.launch({
      headless: false,
    });
  }
  

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.pomanager = new POManager(this.page);
});


AfterStep(async function ({ result }) {

  if (result.status === Status.FAILED) {
    const buffer = await this.page.screenshot();

    let timestamp = new Date().getTime();
    await this.page.screenshot({ path: "screenshotdir/screenshot1_" + timestamp + ".png" });

    this.attach(buffer.toString('base64'), 'base64:image/png');
    console.log(`Screenshot logged for ${this.scenarioName}`)
  }
});

After(async function () {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
