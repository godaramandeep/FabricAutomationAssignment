const { expect } = require("@playwright/test");
import pageTitles from "../testData/pageTitles.json";
import pageHeaders from "../testData/pageHeaders.json";
const { addCustomerData } = require('../utils/dataHandler');

class AccountsOverviewPage{

    constructor(page) {
        this.page = page;
        this.accountsOverviewHeaderLocator = page.locator(".title");
        this.accountsOverviewTableLocator = page.locator("#accountTable tbody");
    }

    async validateAccountOverviewPageHeader()
    {
        await this.accountsOverviewHeaderLocator.first().waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.accountsOverviewPageTitle); 
        await expect(this.accountsOverviewHeaderLocator.first()).toHaveText(pageHeaders.accountsOverviewPageHeader)
    }

    async getAccountDetailsOnAccountOverviewPage(counter, accountName) {
        await this.accountsOverviewTableLocator.locator("tr a").first().waitFor({state : 'attached'});
        const accountNumber =  await this.accountsOverviewTableLocator.locator("tr a").nth(counter).textContent();
        const accountAmount =  await this.accountsOverviewTableLocator.locator("tr td:nth-child(2)").nth(counter).textContent();
        addCustomerData(accountName + 'AccountAmount', accountAmount);
        addCustomerData(accountName + 'AccountNumber', accountNumber);
    }


    async validateAmountForAccountOnAccountsOverviewPage(account,amount){
        await this.accountsOverviewTableLocator.locator("tr a").first().waitFor({state : 'attached'});
        const optionsCount = await this.accountsOverviewTableLocator.locator("tr a").count();
        for(let i =0;i< optionsCount; ++i)
        {
          const accountNumber =  await this.accountsOverviewTableLocator.locator("tr a").nth(i).textContent();
            if(accountNumber.trim() === account)
            {
               await expect(this.accountsOverviewTableLocator.locator("tr td:nth-child(2)").nth(i)).toHaveText(amount);
               break;
            }
        }

    }

}
module.exports = {AccountsOverviewPage}
