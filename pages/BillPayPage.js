const { expect } = require("@playwright/test");
import pageTitles from "../testData/pageTitles.json";
import pageHeaders from "../testData/pageHeaders.json";
const Constants = require('../utils/Constants');
import payeeData from "../testData/payeeData.json";

class BillPayPage{

    constructor(page) {
        this.page = page;
        this.billPayHeaderLocator = page.locator(".title");
        this.payeeNameTextBoxLocator = page.locator("[name='payee.name']");
        this.addressTextBoxLocator = page.locator("[name='payee.address.street']");
        this.cityTextBoxLocator = page.locator("[name='payee.address.city']");
        this.stateTextBoxLocator = page.locator("[name='payee.address.state']");
        this.zipcodeTextBoxLocator = page.locator("[name='payee.address.zipCode']");
        this.phoneNumberTextBoxLocator = page.locator("[name='payee.phoneNumber']");
        this.accountNumberTextBoxLocator = page.locator("[name='payee.accountNumber']");
        this.verifyAccountNumberTextBoxLocator = page.locator("[name='verifyAccount']");
        this.amountTextBoxLocator = page.locator("[name='amount']");
        this.fromAccountSelectBoxLocator = page.locator("[name='fromAccountId']");
        this.sendPaymentButtonLocator = page.locator("input[value='Send Payment']");
        this.billToPayMessageLocator = page.locator("#billpayResult p");
       
    }

    async validateBillPayPageHeader()
    {
        await this.billPayHeaderLocator.first().waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.billPayPageTitle); 
        await expect(this.billPayHeaderLocator.first()).toHaveText(pageHeaders.billPayPageHeader)
    }

    async enterDetailsOnBillPayPage(amount,fromAccountNumber) {
        await this.payeeNameTextBoxLocator.fill(Constants.PAYEE_NAME);
        await this.addressTextBoxLocator.fill(payeeData.payeeAddress);
        await this.cityTextBoxLocator.fill(payeeData.payeeCity);
        await this.stateTextBoxLocator.fill(payeeData.payeeState);
        await this.zipcodeTextBoxLocator.fill(payeeData.payeeZipCode);
        await this.phoneNumberTextBoxLocator.fill(payeeData.payeePhoneNumber);
        await this.accountNumberTextBoxLocator.fill(payeeData.payeeAccountNumber);
        await this.verifyAccountNumberTextBoxLocator.fill(payeeData.payeeAccountNumber);
        await this.amountTextBoxLocator.fill(String(amount));
        await this.fromAccountSelectBoxLocator.selectOption({value : fromAccountNumber});
        await this.sendPaymentButtonLocator.click();
    }

    async validateBillPaymentCompletePageHeader()
    {
        await this.billPayHeaderLocator.nth(1).waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.billPaymentCompletePageTitle); 
        await expect(this.billPayHeaderLocator.nth(1)).toHaveText(pageHeaders.billPaymentCompletedPageHeader)
    }


    async validateBillPaymentCompleteMessage(amount,fromAccountNumber)
    {
        const expectedValue = `Bill Payment to ${Constants.PAYEE_NAME} in the amount of ${amount} from account ${fromAccountNumber} was successful.`
        await expect(this.billToPayMessageLocator.first()).toContainText(expectedValue);
    }
 
}
module.exports = {BillPayPage}
