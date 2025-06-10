const { expect } = require("@playwright/test");
import pageTitles from "../testData/pageTitles.json";
import pageHeaders from "../testData/pageHeaders.json";
import Constants from "../utils/Constants";
const { getCustomerData } = require('../utils/dataHandler');


class LandingPage{

    constructor(page) {
        this.page = page;
        this.welcomePageHeaderLocator = page.locator(".title");
        this.homeLinkLocator  = page.locator("#headerPanel .home a");
        this.aboutLinkLocator  = page.locator("#headerPanel .aboutus a");
        this.contactLinkLocator  = page.locator("#headerPanel .contact a");
        this.atmServicesLinkLocator = page.getByText("ATM Services");
        this.newAccountLinkLocator = page.getByText("Open New Account");
        this.accountsOverviewLinkLocator = page.getByText("Accounts Overview");
        this.transferFundsLinkLocator = page.getByText("Transfer Funds");
        this.billPayLinkLocator = page.getByText("Bill Pay");
    }

    async validateLandingPageHeader()
    {
        await this.welcomePageHeaderLocator.waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.landingPageTitle); 
        await expect(this.welcomePageHeaderLocator).toHaveText(pageHeaders.landingPageHeader + getCustomerData(Constants.USERNAME))
    }

    async clickOnHomeButtonLink(){
        await this.homeLinkLocator.waitFor({state : 'visible'});
        await this.homeLinkLocator.click();
    }

    async clickOnAboutUsButtonLink(){
        await this.aboutLinkLocator.click();
    }

    async clickOnContactButtonLink(){
        await this.contactLinkLocator.click();
    }

    async validateHomePageHeader(){
        await this.atmServicesLinkLocator.waitFor();
        await expect(this.atmServicesLinkLocator).toHaveText(Constants.ATM_SERVICES);
    }

    async clickOnOpenNewAccountLinkOnLandingPage(){
        this.newAccountLinkLocator.click();
    }

    async clickOnAccountsOverviewLinkOnLandingPage(){
        await this.accountsOverviewLinkLocator.click();
    }

    async clickOnTransferFundsLinkOnLandingPage(){
        await this.transferFundsLinkLocator.click();
    }

    async clickOnBillPayLinkOnLandingPage(){
        await this.billPayLinkLocator.click();
    }

}
module.exports = {LandingPage}
