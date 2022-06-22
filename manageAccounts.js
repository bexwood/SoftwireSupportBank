import BankAccount from "./bankAccount.js";

export default class accountManager {
    constructor(){
        this.Accounts = [];
    }

    updateAccount(accountName, transaction){
        if (typeof accounts.find(element => element.Name === accountName) === "undefined") {
            this.initialiseAccount(accountName);
        }
        let account = accounts.find(element => element.Name === accountName)
        account.updateAccount()
    }

    initialiseAccount(accountName){
        let newAccount = new BankAccount(accountName, 0.00);
        this.Accounts.push(newAccount);
    }
}