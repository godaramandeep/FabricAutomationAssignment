const { expect } = require("@playwright/test");
import pageTitles from "../testData/pageTitles.json";
import pageHeaders from "../testData/pageHeaders.json";

class ContactPage{

    constructor(page) {
       this.page = page;
       this.contactPageHeaderLocator = page.locator(".title");
    }

    async validateContactPageHeader()
    {
        await this.contactPageHeaderLocator.waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.contactPageTitle); 
        await expect(this.contactPageHeaderLocator).toHaveText(pageHeaders.contactPageHeader)
    }

}
module.exports = {ContactPage}