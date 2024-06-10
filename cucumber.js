const { devices } = require('@playwright/test');
module.exports = {
  //desktop: `--world-parameters '{"device": {"type":"desktop","height":720,"width":1280}}'`,
  default: {
    defaultTimeout: 10000,
    require: [
      'features/support/hooks.js',
      'features/step_definitions/*.spec.js'
    ],
    forceExit: true,
    format: ["html:reports/cucumber-report.html", 
    "json:reports/cucumber-report.json",
    './reporter.js'],
    retry: 2,
    parallel: 3,
    "worldParameters": {
      // "device": {"type":"desktop","height":720,"width":1280},
      "browser": "chromium"
      // "height":720,
      // "width":1280,
      // projects: [
      //   {
      //     name: 'chromium',
      //     use: { ...devices['iPhone 12 Mini'] },
      //   }]
      //"device": {"type":"desktop","height":720,"width":1280}
    }

  },
  firefoxProfile: {
    defaultTimeout: 10000,
    require: [
      'features/support/hooks.js',
      'features/step_definitions/*.spec.js'
    ],
    forceExit: true,
    format: ["html:reports/cucumber-report.html", 
    "json:reports/cucumber-report.json"],
    "worldParameters": {
      
      "browser": "firefox"
    }

  }
};

