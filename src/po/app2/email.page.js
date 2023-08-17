const Page = require('../page');


class EmailPage extends Page{
    
    get email () { return $('//section//div/div[2]/div/div/div/p') }; 
    get openMessageButton () { return $(' div.flex.w-full.flex-col.overflow-y-scroll > button') };
    get totalCostPrice () { return $('table.quote tbody tr:nth-child(2) td:nth-child(2) h3') };

    async openMessage () {
        await this.openMessageButton.isDisplayed();
        await this.openMessageButton.click();
    };

    open () {
        return super.open('https://internxt.com/temporary-email');
    };
};

module.exports = new EmailPage();