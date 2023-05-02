const HomePage = require('../po/pages/home.page');
const CalculatorPage = require('../po/pages/calculator.page');

const SEARCH_TEXT = "Google Cloud Platform Pricing Calculator";
const NUMBER_OF_INSTANCE = 4;
const REASON_FOR_INSTANCE = 'leave blank';
const LOCATION = 'Frankfurt';
const TEXT_LOCATION = 'Region: Frankfurt';
const VM_CLASS = 'Provisioning model: Regular';
const INSTANCE_TYPE = 'Instance type: n1-standard-8';
const LOCAL_SSD = 'Local SSD: 2x375 GiB';
const COMMITMENT_TERM = 'Commitment term: 1 Year';
const AMOUNT = 'Total Estimated Cost: USD 1,081.20 per 1 month';

describe("Find a calculator and add estimate", () => {

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
    });

    it('check fields', async () => {
        await CalculatorPage.checkFields(VM_CLASS, 
                                         INSTANCE_TYPE, 
                                         TEXT_LOCATION, 
                                         LOCAL_SSD, 
                                         COMMITMENT_TERM);
    });

    it('check amounts', async () => {
        await CalculatorPage.checkCost(AMOUNT);
        await CalculatorPage.goOutFrames();
    });
});