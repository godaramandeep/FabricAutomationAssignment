const { test, expect } = require("@playwright/test");
const ParaPOManger = require('../pages/ParaPOManager');
const { getCustomerData, addCustomerData } = require('../utils/dataHandler');
const Constants = require('../utils/Constants');
const CommonFunctions = require('../utils/commonFunctions');
const {FindTransaction} = require('../api/FindTransaction');
import path from 'path';
const {request} = require('@playwright/test');

test('Test to Validate UI for Register New User, Create Account, Transfer Amount and Bill To Pay', { tags: "@UI" }, async ({ page }) => {

    //Get all the page objects from PO Manager file
    const paraPOManager = new ParaPOManger(page);
    const homePage = paraPOManager.homePage;
    const registrationPage = paraPOManager.registrationPage;
    const landingPage = paraPOManager.landingPage;
    const aboutUsPage = paraPOManager.aboutUsPage;
    const contactPage = paraPOManager.contactPage;
    const openNewAccountPage = paraPOManager.openNewAccountPage;
    const accountsOverviewPage = paraPOManager.accountsOverviewPage;
    const transferFundsPage = paraPOManager.transferFundsPage;
    const billPayPage = paraPOManager.billPayPage;


    //Navigate to the ParaBank Application
    await homePage.navigateToTheParaBankApplication();

    //Register New User In System
    await homePage.clickOnRegistrationLinkOnHomePage();
    await registrationPage.validateRegistrationPageTitle();
    await registrationPage.fillRegistrationFormForNewUserLogin();
    await registrationPage.clickOnRegistrationButtonToCreateNewUserLogin();

    //Validate New User Is Created
    await landingPage.validateLandingPageHeader();
    
    //Validate All Global Links on landing page
    await landingPage.clickOnHomeButtonLink();
    await landingPage.validateHomePageHeader();
    await landingPage.clickOnAboutUsButtonLink();
    await aboutUsPage.validateAboutUsPageHeader();
    await landingPage.clickOnContactButtonLink();
    await contactPage.validateContactPageHeader();

    //First Get Details of Old Account on Account Overview page
    await landingPage.clickOnAccountsOverviewLinkOnLandingPage();
    await accountsOverviewPage.validateAccountOverviewPageHeader();
    await accountsOverviewPage.getAccountDetailsOnAccountOverviewPage(0, Constants.OLD);


    //Open New Saving Account and Saved Account Details In JSON File
    await landingPage.clickOnOpenNewAccountLinkOnLandingPage();
    await openNewAccountPage.validateOpenNewAccountPageHeader();
    await openNewAccountPage.selectAccountTypeFromTheDropDown(Constants.SAVINGS);
    await openNewAccountPage.clickOnOpenNewAccountButton();
    await openNewAccountPage.validateOpenedAccountPageHeader();
    await openNewAccountPage.validateOpenedAccountTextMessage();
    await openNewAccountPage.getOpenAccountDetails();

    
    //Validate Newly Created Account Details On Account Overview Page
    await landingPage.clickOnAccountsOverviewLinkOnLandingPage();
    await accountsOverviewPage.validateAccountOverviewPageHeader();
    await accountsOverviewPage.validateAmountForAccountOnAccountsOverviewPage(getCustomerData(Constants.NEW_ACCOUNT_NUMBER), getCustomerData(Constants.NEW_ACCOUNT_AMOUNT));
    
    //Validate OLD Account Details On Account Overview Page
    await addCustomerData(Constants.OLD_ACCOUNT_AMOUNT, CommonFunctions.subtractTwoNumbers(getCustomerData(Constants.OLD_ACCOUNT_AMOUNT),getCustomerData(Constants.NEW_ACCOUNT_AMOUNT)));
    await accountsOverviewPage.validateAmountForAccountOnAccountsOverviewPage(getCustomerData(Constants.OLD_ACCOUNT_NUMBER), getCustomerData(Constants.OLD_ACCOUNT_AMOUNT));

    //Transfer funds from one account to another account
    await landingPage.clickOnTransferFundsLinkOnLandingPage();
    await transferFundsPage.validateTransferFundsPageHeader();
    await transferFundsPage.transferAmountFromOneAccountToAnotherAccount(CommonFunctions.removeDollar(Constants.AMOUNT_USED),getCustomerData(Constants.OLD_ACCOUNT_NUMBER),getCustomerData(Constants.NEW_ACCOUNT_NUMBER));
    await transferFundsPage.validateAfterTransferFundsPageHeader();
    await transferFundsPage.validateTransferAmountMessage(Constants.AMOUNT_USED,getCustomerData(Constants.OLD_ACCOUNT_NUMBER),getCustomerData(Constants.NEW_ACCOUNT_NUMBER));

    //Validate Updated Amount In Newly Created Account On Account Overview Page
    await landingPage.clickOnAccountsOverviewLinkOnLandingPage();
    await accountsOverviewPage.validateAccountOverviewPageHeader();
     await addCustomerData(Constants.NEW_ACCOUNT_AMOUNT, CommonFunctions.addTwoNumbers(getCustomerData(Constants.NEW_ACCOUNT_AMOUNT),Constants.AMOUNT_USED));
    await accountsOverviewPage.validateAmountForAccountOnAccountsOverviewPage(getCustomerData(Constants.NEW_ACCOUNT_NUMBER), getCustomerData(Constants.NEW_ACCOUNT_AMOUNT));
    
    //Validate Updated Amount In OLD Account On Account Overview Page
    await addCustomerData(Constants.OLD_ACCOUNT_AMOUNT, CommonFunctions.subtractTwoNumbers(getCustomerData(Constants.OLD_ACCOUNT_AMOUNT),Constants.AMOUNT_USED));
    await accountsOverviewPage.validateAmountForAccountOnAccountsOverviewPage(getCustomerData(Constants.OLD_ACCOUNT_NUMBER), getCustomerData(Constants.OLD_ACCOUNT_AMOUNT));


    //Bill To Pay from OLD Account
    await landingPage.clickOnBillPayLinkOnLandingPage();
    await billPayPage.validateBillPayPageHeader();
    await billPayPage.enterDetailsOnBillPayPage(CommonFunctions.removeDollar(Constants.AMOUNT_USED),getCustomerData(Constants.OLD_ACCOUNT_NUMBER));
    await billPayPage.validateBillPaymentCompletePageHeader();
    await billPayPage.validateBillPaymentCompleteMessage(Constants.AMOUNT_USED,getCustomerData(Constants.OLD_ACCOUNT_NUMBER));

    //Validate Updated Amount In OLD Account On Account Overview Page
    await landingPage.clickOnAccountsOverviewLinkOnLandingPage();
    await accountsOverviewPage.validateAccountOverviewPageHeader();
    await addCustomerData(Constants.OLD_ACCOUNT_AMOUNT, CommonFunctions.subtractTwoNumbers(getCustomerData(Constants.OLD_ACCOUNT_AMOUNT),Constants.AMOUNT_USED));
    await accountsOverviewPage.validateAmountForAccountOnAccountsOverviewPage(getCustomerData(Constants.OLD_ACCOUNT_NUMBER), getCustomerData(Constants.OLD_ACCOUNT_AMOUNT));


    //Store the State of the application
    const authFile = path.join(__dirname, '../playwright/.auth/user.json');
    await page.context().storageState({path: authFile});

});

test('Test to Find Transaction API to Validate Bill Payment To, Amount and Account Number',{tags: "@API"},async ({}) => {
  
    //Calling Find Transaction API to Validate Bill Payment To Amount and Account Number
    await new FindTransaction(await request.newContext()).findAndValidateBillToPayTransactionDetails(getCustomerData(Constants.OLD_ACCOUNT_NUMBER), Number(CommonFunctions.removeDollar(Constants.AMOUNT_USED)));
});

