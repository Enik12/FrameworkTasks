

module.exports = class Page {

    open () {
        return browser.url('https://cloud.google.com/');
    };

    open2 () {
        return browser.url('https://internxt.com/temporary-email');
    };

};