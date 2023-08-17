const HomePage = require('../po/app1/home.page');
const CalculatorPage = require('../po/app1/calculator.page');
const EmailPage = require('../po/app2/email.page');

const SEARCH_TEXT = 'Google Cloud Platform Pricing Calculator';
const NUMBER_OF_INSTANCE = 4;
const REASON_FOR_INSTANCE = 'leave blank';
const LOCATION = 'Frankfurt';
const INTERNXT_URL = 'https://internxt.com/temporary-email';
const GOOGLE_ADDRESS = 'cloud.google.com';
let totalCost;

describe('Activate the compute engine and send a email', () => {

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
        await CalculatorPage.goOutFrames();
    });

    it('email estimate', async () => {
        await browser.newWindow(INTERNXT_URL);
        await EmailPage.email.isDisplayed();
        const email = await EmailPage.email.getText();
        await browser.switchWindow(GOOGLE_ADDRESS);
        await CalculatorPage.switchFrames();
        await CalculatorPage.sendEmail(email);
        await CalculatorPage.goOutFrames();
        await browser.switchWindow(INTERNXT_URL);
        await browser.pause(5000);
        await EmailPage.openMessage();
        totalCost = await EmailPage.totalCostPrice.getText();
    });

    it('check total cost', async () => {
        await browser.switchWindow(GOOGLE_ADDRESS);
        await CalculatorPage.switchFrames();
        await CalculatorPage.checkRentalAmount.scrollIntoView({ block: 'center', inline: 'center' });
        await expect(CalculatorPage.checkRentalAmount).toHaveTextContaining(totalCost);
        await CalculatorPage.goOutFrames();
    });

});