const { expect } = require("@playwright/test");
import pageTitles from "../testData/pageTitles.json";

class HomePage{

    constructor(page) {
        this.page = page;
        this.HomePageLogoTextLocator = page.locator(".caption");
        this.registerLinkLocator = page.getByText("Register");
    }

    async navigateToTheParaBankApplication()
    {
        await this.page.goto('/');
        await this.HomePageLogoTextLocator.waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.homePageTitle); 

    }

    async clickOnRegistrationLinkOnHomePage() 
    {   
        await this.registerLinkLocator.click();
    }

}
module.exports = {HomePage}
