const { expect } = require("@playwright/test");
import pageTitles from "../testData/pageTitles.json";
import pageHeaders from "../testData/pageHeaders.json";
const { addCustomerData } = require('../utils/dataHandler');
const Constants = require('../utils/Constants');

class OpenNewAccountPage{

    constructor(page) {
        this.page = page;
        this.openNewAccountHeaderLocator = page.locator(".title");
        this.accountTypeSelectLocator = page.locator("#type");
        this.openNewAccountButtonLocator = page.locator("input[value='Open New Account']");
        this.openedAccountHeaderLocator = page.locator(".title");
        this.openAccountResultLocator = page.locator("#openAccountResult");
        this.accountNumberLinkLocator = page.locator("#newAccountId");
    }

    async validateOpenNewAccountPageHeader()
    {
        await this.openNewAccountHeaderLocator.first().waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.openNewAccountPageTitle); 
        await expect(this.openNewAccountHeaderLocator.first()).toHaveText(pageHeaders.openNewAccountPageHeader)
    }

    async selectAccountTypeFromTheDropDown(accountName){
        await this.accountTypeSelectLocator.selectOption(accountName);
    }

    async clickOnOpenNewAccountButton(){
        await this.accountTypeSelectLocator.waitFor({state: 'attached'});
        await this.page.waitForTimeout(2000);
        await this.openNewAccountButtonLocator.click();
    }

    async validateOpenedAccountPageHeader()
    {
        await this.openedAccountHeaderLocator.nth(1).waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.openNewAccountPageTitle); 
        await expect(this.openedAccountHeaderLocator.nth(1)).toHaveText(pageHeaders.openedAccountPageHeader)
    }

    async validateOpenedAccountTextMessage(){
        await this.openAccountResultLocator.waitFor({state: 'visible'});
        await expect(this.openAccountResultLocator).toBeVisible();
        await expect(this.openAccountResultLocator.locator("p").first()).toHaveText(Constants.CONGRATULATION_MESSAGE);
    }

    async getOpenAccountDetails(){
        const accountNumber = await this.accountNumberLinkLocator.textContent();
        addCustomerData(Constants.NEW_ACCOUNT_NUMBER,accountNumber);
        addCustomerData(Constants.NEW_ACCOUNT_AMOUNT,'$100.00');
    }
}
module.exports = {OpenNewAccountPage}
