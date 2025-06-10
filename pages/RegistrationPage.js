const { expect } = require("@playwright/test");
import pageTitles from "../testData/pageTitles.json";
import pageHeaders from "../testData/pageHeaders.json";
import userRegistrationData from "../testData/userRegistrationData.json";
const CommonFunctions = require('../utils/commonFunctions');
const Constants = require('../utils/Constants');
const { addCustomerData } = require('../utils/dataHandler');


class RegistrationPage{

    constructor(page) {
        this.page = page;
        this.registrationPageHeaderLocator = page.locator('.title');
        this.firstNameInputLocator = page.locator("#customer\\.firstName");
        this.lastNameInputLocator = page.locator("#customer\\.lastName");
        this.addressInputLocator = page.locator("#customer\\.address\\.street");
        this.cityInputLocator = page.locator("#customer\\.address\\.city");
        this.stateInputLocator = page.locator("#customer\\.address\\.state");
        this.zipCodeInputLocator = page.locator("#customer\\.address\\.zipCode");
        this.phoneNumberInputLocator = page.locator("#customer\\.phoneNumber");
        this.ssnInputLocator = page.locator("#customer\\.ssn");
        this.usernameInputLocator = page.locator("#customer\\.username");
        this.passwordInputLocator = page.locator("#customer\\.password");
        this.repeatedPasswordInputLocator = page.locator("#repeatedPassword");
        this.registrationButtonLocator = page.locator("input[value='Register']");
    }

    async validateRegistrationPageTitle()
    {
        await this.registrationPageHeaderLocator.waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.registrationPageTitle); 
    }

    async fillRegistrationFormForNewUserLogin()
    {
        await expect(this.registrationPageHeaderLocator).toHaveText(pageHeaders.registrationPageHeader); 
        await this.firstNameInputLocator.fill(CommonFunctions.createRandomValue(userRegistrationData.userFirstName));
        await this.lastNameInputLocator.fill(userRegistrationData.userLastName);
        await this.addressInputLocator.fill(userRegistrationData.userAddress);
        await this.cityInputLocator.fill(userRegistrationData.userCity);
        await this.stateInputLocator.fill(userRegistrationData.userState);
        await this.zipCodeInputLocator.fill(userRegistrationData.userZipCode);
        await this.phoneNumberInputLocator.fill(userRegistrationData.userPhoneNumber);
        await this.ssnInputLocator.fill(userRegistrationData.userSsn);
        const username = CommonFunctions.createRandomValue(Constants.RANDOM_USER);
        const password = CommonFunctions.createRandomValue(Constants.RANDOM_PASS);
        addCustomerData(Constants.USERNAME,username);
        await this.usernameInputLocator.fill(username);
        await this.passwordInputLocator.fill(password);
        await this.repeatedPasswordInputLocator.fill(password);  
    }

    async clickOnRegistrationButtonToCreateNewUserLogin() 
    {
        await this.registrationButtonLocator.click();
    }
}
module.exports = {RegistrationPage}
