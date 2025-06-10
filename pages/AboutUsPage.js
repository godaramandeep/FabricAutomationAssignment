const { expect } = require("@playwright/test");
import pageTitles from "../testData/pageTitles.json";
import pageHeaders from "../testData/pageHeaders.json";

class AboutUsPage{

    constructor(page) {
       this.page = page;
       this.aboutUsPageHeaderLocator = page.locator(".title");
    }

    async validateAboutUsPageHeader()
    {
        await this.aboutUsPageHeaderLocator.waitFor({
            state: 'visible',
            timeout: 30000
        });
        await expect(this.page).toHaveTitle(pageTitles.aboutUsPageTitle); 
        await expect(this.aboutUsPageHeaderLocator).toHaveText(pageHeaders.aboutUsPageHeader)
    }

}
module.exports = {AboutUsPage}