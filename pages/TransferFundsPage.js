const { expect } = require("@playwright/test");
import pageTitles from "../testData/pageTitles.json";
import pageHeaders from "../testData/pageHeaders.json";
const { getCustomerData, addCustomerData } = require('../utils/dataHandler');
const Constants = require('../utils/Constants');
const CommonFunctions = require('../utils/commonFunctions');

class TransferFundsPage{

    constructor(page) {
        this.page = page;
        this.transferFundsHeaderLocator = page.locator(".title");
        this.fromAccountLocator = page.locator("#fromAccountId");
        this.toAccountLocator = page.locator("#toAccountId");
        this.amountTextBoxLocator = page.locator("#amount");
        this.transferButtonLocator = page.locator("input[value='Transfer']");
        this.transferCompletedMessageLocator = page.locator("#showResult .title");
        this.transferMessageLocator = page.locator("#showResult p");
       
    }

    async validateTransferFundsPageHeader()
    {
        await this.transferFundsHeaderLocator.first().waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.transferFundsPageTitle); 
        await expect(this.transferFundsHeaderLocator.first()).toHaveText(pageHeaders.transferFundsPageHeader)
    }

    async transferAmountFromOneAccountToAnotherAccount(amount,fromAccountNumber, toAccountNumber){
        await this.fromAccountLocator.waitFor({state : 'attached'});
        await this.amountTextBoxLocator.fill(String(amount));
        await this.fromAccountLocator.selectOption({value : fromAccountNumber});
        await this.toAccountLocator.selectOption({value : toAccountNumber});
        await this.transferButtonLocator.click();
    }

    async validateAfterTransferFundsPageHeader()
    {
        await this.transferFundsHeaderLocator.nth(1).waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.transferFundsPageTitle); 
        await expect(this.transferFundsHeaderLocator.nth(1)).toHaveText(pageHeaders.afterTransferFundsPageHeader)
    }

    async validateTransferAmountMessage(amount,fromAccountNumber,toAccountNumber)
    {
        const expectedValue = `${amount} has been transferred from account #${fromAccountNumber} to account #${toAccountNumber}.`
        await expect(this.transferMessageLocator.first()).toContainText(expectedValue);
    }

}
module.exports = {TransferFundsPage}
