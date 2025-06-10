const { expect } = require("@playwright/test");
const loginAuth = require("../playwright/.auth/user.json");
const Constants = require('../utils/Constants');

class FindTransaction
{
    constructor(apiContext)
    {
        this.apiContext = apiContext; 
    }

    async findAndValidateBillToPayTransactionDetails(accountNumber,orderAmount)
    {
        const findTransactionResponse = await this.apiContext.get(`https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountNumber}/transactions/amount/${orderAmount}?timeout=30000`,
        {   
            headers:{
                'Cookie' : `JSESSIONID=${loginAuth.cookies[0].value}`
            },

    })
   const findTransactionResponseJsonArray = await findTransactionResponse.json();
   for (let i = 0; i < findTransactionResponseJsonArray.length; i++) {
        if(findTransactionResponseJsonArray[i].description.includes(Constants.BILL_PAYMENT_TO)) {
            expect(findTransactionResponseJsonArray[i].accountId).toBe(Number(accountNumber));
            expect(findTransactionResponseJsonArray[i].type).toBe(Constants.DEBIT);
            expect(findTransactionResponseJsonArray[i].amount).toBe(orderAmount);
            break;
        }
    }
  }
}
module.exports = {FindTransaction};




