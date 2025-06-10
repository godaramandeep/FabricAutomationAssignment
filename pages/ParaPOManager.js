const {HomePage} = require ('./HomePage')
const {RegistrationPage} = require ('./RegistrationPage')
const {LandingPage} = require('./LandingPage')
const {AboutUsPage} = require('./AboutUsPage')
const {ContactPage} = require('./ContactPage')
const {OpenNewAccountPage} = require('./OpenNewAccountPage')
const {AccountsOverviewPage} = require('./AccountsOverviewPage')
const {TransferFundsPage} = require('./TransferFundsPage')
const {BillPayPage} = require('./BillPayPage');

class ParaPOManager {

    constructor(page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.registrationPage = new RegistrationPage(this.page);
        this.landingPage = new LandingPage(this.page);
        this.aboutUsPage = new AboutUsPage(this.page);
        this.contactPage = new ContactPage(this.page);
        this.openNewAccountPage= new OpenNewAccountPage(this.page);
        this.accountsOverviewPage = new AccountsOverviewPage(this.page);
        this.transferFundsPage = new TransferFundsPage(this.page);
        this.billPayPage = new BillPayPage(this.page);
    }

}
module.exports = ParaPOManager