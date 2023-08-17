const Page = require('../page');

class CalculatorPage extends Page{

    get iFrame1() { return $('iframe[allow="clipboard-write https://cloud-dot-devsite-v2-prod.appspot.com"]') };
    get iFrame2() { return $('#myFrame') };
    get computeEngine () { return $('div.tab-holder.compute') };
    get numberOfInstances () { return $('//input[@ng-model="listingCtrl.computeServer.quantity"]') };
    get instanceFor () { return $('//input[@ng-model="listingCtrl.computeServer.label"]') };
    get series () { return $('//md-select[@name="series"][@placeholder="Series"]') };
    get n1Series() { return $('//md-option[@value="n1"]') };
    get instanceType () { return $('//md-select[@placeholder="Instance type"]') };
    get n1standard8 () { return $('//md-option[@value="CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8"]') };
    get addGPUs () { return $('//md-checkbox[@ng-model="listingCtrl.computeServer.addGPUs"]') };
    get gpuType () { return $('//md-select[@placeholder="GPU type"]') };
    get nvidiaTesla () { return $('//md-option[@value="NVIDIA_TESLA_V100"]') };
    get numberGPU () { return $('//md-select[@placeholder="Number of GPUs"]') };
    get oneNumber () { return $('//div[@class="md-select-menu-container md-active md-clickable"]//md-option[2]') };
    get localSSD () { return $('//md-select[@placeholder="Local SSD"]') };
    get twoGB () { return $('//md-option[@ng-repeat="item in listingCtrl.dynamicSsd.computeServer"] [@value="2"]') };
    get datacenterLocation () { return $('//md-select[@placeholder="Datacenter location"]') };
    get inputLocation () { return $('//input[@ng-model="listingCtrl.inputRegionText.computeServer"]') };
    get frankfurt () { return $('//*[@id="select_container_132"]/md-select-menu/md-content/md-optgroup/md-option[26]') }; 
    get committedUsage () { return $('//md-select[@placeholder="Committed usage"]') };
    get oneyear () { return $('//div[@class="md-select-menu-container md-active md-clickable"]//md-option[2]') };
    get addToEstimateBtn () { return $('button.md-raised.md-primary.cpc-button.md-button.md-ink-ripple') };
    get checkRegion () { return $('//*[@id="compute"]/md-list/md-list-item[1]/div[1]') };
    get checkCommitmentTerm () { return $('//*[@id="compute"]/md-list/md-list-item[3]/div[1]') };
    get checkVmClass () { return $('//*[@id="compute"]/md-list/md-list-item[4]/div[1]') };
    get checkInstanceType () { return $('//*[@id="compute"]/md-list/md-list-item[5]/div[1]') };
    get checkLocalSsd () { return $('//*[@id="compute"]/md-list/md-list-item[7]/div[1]') };
    get checkRentalAmount () { return $('div.cpc-cart-total > h2 > b') };
    get btnEmailEstimate () { return $('//button[@id="Email Estimate"]') };
    get inputEmail () { return $('//form[@name="emailForm"]/md-content/div[3]/md-input-container/input') };
    get btnSendEmail () { return $('form > md-dialog-actions > button:last-child') };

    async switchFrames(){
        let iframeOne = await this.iFrame1;
        await browser.switchToFrame(iframeOne);
        let iframeTwo = await this.iFrame2;
        await browser.switchToFrame(iframeTwo);
    };

    async goOutFrames(){
        await browser.switchToFrame(null);
    };

    async addEstimate (num, text, location) {
        await this.computeEngine.click();
        await this.numberOfInstances.click();
        await this.numberOfInstances.setValue(num);
        await this.instanceFor.click();
        await this.instanceFor.setValue(text);
        await this.series.click();
        await this.n1Series.click();
        await this.instanceType.click();
        await this.n1standard8.waitForClickable( { timeout: 3000 } );
        await this.n1standard8.click();
        await this.addGPUs.click();
        await this.gpuType.click();
        await this.nvidiaTesla.waitForClickable( {timeout: 6000} );
        await this.nvidiaTesla.click();
        await this.numberGPU.click();
        await this.oneNumber.click();
        await this.localSSD.click();
        await this.twoGB.waitForClickable( {timeout: 6000} );
        await this.twoGB.click();
        await this.datacenterLocation.click();
        await this.inputLocation.click();
        await this.inputLocation.setValue(location);
        await this.frankfurt.click();
        await this.committedUsage.click();
        await this.oneyear.click();
        await this.addToEstimateBtn.click();
    };

    async sendEmail(email){
        await this.btnEmailEstimate.click();
        await this.inputEmail.setValue(email);
        await this.btnSendEmail.click();
    };

    open(){
        return super.open();
    };
};

module.exports = new CalculatorPage();