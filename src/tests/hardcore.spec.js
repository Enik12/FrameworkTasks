const HomePage = require('../po/pages/home.page');
const CalculatorPage = require('../po/pages/calculator.page');

const SEARCH_TEXT = "Google Cloud Platform Pricing Calculator";
const NUMBER_OF_INSTANCE = 4;
const REASON_FOR_INSTANCE = 'leave blank';
const LOCATION = 'Frankfurt';

describe("Activate the compute engine and send a email", () => {

    afterEach(async function () {
        if (this.currentTest.state != "passed") {
            let screenshotFileName = this.currentTest.fullTitle();
            let stringToArray = screenshotFileName.split(" ");
            let arrayToString = stringToArray.join('-');
            let date = new Date();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = [day, month, year, hour, minutes].join('-');
            let name = arrayToString + currentDate;
            await browser.saveScreenshot('errorShots/' + name + '.png');
        }
    });


    it('search calculator', async () => {
        await HomePage.open();
        await browser.setTimeout({ 'pageLoad': 10000 });
        await HomePage.searchCalculator(SEARCH_TEXT);
    });

    it('add compute engine', async () => {
        await CalculatorPage.switchFrames();
        await browser.setTimeout({ implicit: 10000 });
        await CalculatorPage.addEstimate(NUMBER_OF_INSTANCE,
            REASON_FOR_INSTANCE,
            LOCATION);
        await browser.pause(3000);
        await CalculatorPage.goOutFrames();
    });

    it('email estimate', async () => {
        await browser.newWindow('https://internxt.com/temporary-email');
        await $('//*[@id="__next"]/section[1]/div[3]/div/div[2]/div[1]/div[1]/div/p').isDisplayed();
        const email = await $('//*[@id="__next"]/div[3]/section[1]/div/div[2]/div[1]/div[1]/div/p').getText();
        await browser.switchWindow('cloud.google.com');
        await CalculatorPage.switchFrames();
        await CalculatorPage.sendEmail(email);
        await CalculatorPage.goOutFrames();
        await browser.switchWindow('internxt.com');
        await browser.pause(5000);
        await $('//*[@id="__next"]/div[3]/section/div/div[3]/div/div/div[2]/button').isDisplayed();
        await $('//*[@id="__next"]/div[3]/section/div/div[3]/div/div/div[2]/button').click();
        const totalCost = await $('table.quote tbody tr:nth-child(2) td:nth-child(2) h3').getText();
        await browser.pause(5000);
        await browser.switchWindow('cloud.google.com');
        await CalculatorPage.switchFrames();
        await CalculatorPage.checkRentalAmount.scrollIntoView({ block: 'center', inline: 'center' });
        await expect(CalculatorPage.checkRentalAmount).toHaveTextContaining(["Total Estimated Cost:", totalCost, "per 1 month"]);
        await CalculatorPage.goOutFrames();

    });

});