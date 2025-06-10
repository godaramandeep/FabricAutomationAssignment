class Constants {
  static RANDOM_USER = "RandomUser";
  static RANDOM_PASS = "RandomPass";
  static USERNAME = "username";
  static ATM_SERVICES = "ATM Services";
  static SAVINGS = 'SAVINGS';
  static OLD = 'old';
  static NEW = 'new';
  static OLD_ACCOUNT_NUMBER = 'oldAccountNumber';
  static NEW_ACCOUNT_NUMBER = 'newAccountNumber';
  static OLD_ACCOUNT_AMOUNT = 'oldAccountAmount';
  static NEW_ACCOUNT_AMOUNT = 'newAccountAmount'; 
  static CONGRATULATION_MESSAGE = 'Congratulations, your account is now open.';
  static AMOUNT_USED = '$100.00';
  static PAYEE_NAME = 'SAM';
  static FIND_TRANSACTION_API = "`https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/accountNumber/transactions/amount/orderAmount?timeout=30000`";
  static BILL_PAYMENT_TO = 'Bill Payment to';
  static DEBIT = 'Debit';
}

module.exports = Constants;
