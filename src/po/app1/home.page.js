const Page = require('../page');

class HomePage extends Page{


    get seachInput () { return $('//input[@placeholder="Search"]') };
    get calculatorResult () { return $('//div/a[@href="https://cloud.google.com/products/calculator"]') };
    
    async searchCalculator (text) {
        await this.seachInput.isDisplayed();
        await this.seachInput.click();
        await this.seachInput.setValue(text);  
        await browser.keys('Enter');
        await this.calculatorResult.waitForClickable();
        await this.calculatorResult.doubleClick();
    };

    open () {
        return super.open('https://cloud.google.com/');
    };
};

module.exports = new HomePage();