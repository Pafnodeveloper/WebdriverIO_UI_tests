require("module-alias/register")

exports.config = {
    
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
    ],
    maxInstances: 3,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        "goog:chromeOptions": {
            args: [
                "--no-sandbox",
                "--disable-infobars",
                // "--headless",
                "--disable-gpu",
                "--window-size=1920,1080",
            ]
        },
        acceptInsecureCerts: true
    }],
    logLevel: 'debug',
    bail: 0,
    baseUrl: 'https://infinbank.com/ru/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,

    services: ['chromedriver','intercept'],   
    framework: 'mocha',    
    reporters: [
        'spec',
        [
            "allure",
            {
                outputDir: "allure-results",
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],

    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        require: ["@babel/register"],
        ui: 'bdd',
        timeout: 60000
    },
    
    before: async function () {
        const chai = require("chai");
        global.expectChai = chai.expect;

        await browser.url(this.baseUrl)
        browser.setTimeout({ pageLoad: 20000 })
    },
    afterTest: function (
        test, 
        context, 
        {error, result, duration, passed, retries}
        ) {
            if(error) {
                browser.takeScreenshot()
            }
        }
}
