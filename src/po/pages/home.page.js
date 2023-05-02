const Page = require('./page');

class HomePage extends Page{


    get seachInput () { return $('//input[@role="searchbox"]') };
    get calculatorResult () { return $("//a[@data-ctorig='https://cloud.google.com/products/calculator']") };
    
    async searchCalculator (text) {
        await this.seachInput.click();
        await this.seachInput.setValue(text);  
        await browser.keys('Enter');
        await this.calculatorResult.click();
    };

    open () {
        return super.open('');
    };
};

module.exports = new HomePage();