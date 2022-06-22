import BankAccount from "./bankAccount.js";
import Transaction from "./transaction.js";

export default class accountManager {
    constructor(){
        this.Accounts = []
    }

    executeTransaction(transaction){
        if (! this.checkForAccount(transaction.To)){
            this.addAccount(transaction.To)
        }
        if (! this.checkForAccount(transaction.From)){
            this.addAccount(transaction.From)
        }
        let receiver = this.findAccount(transaction.To);
        let sender = this.findAccount(transaction.From);
        sender.addTransaction(transaction);
        receiver.addTransaction(transaction);
    }

    checkForAccount(accountName){
        if (typeof this.Accounts.find(element => element.Name === accountName) === "undefined"){
            return 0;
        } else {
            return 1;
        }

    }

    addAccount(accountName){
        let newAccount = new BankAccount(accountName, 0.00);
        this.Accounts.push(newAccount);
    }

    findAccount(accountName){
        return this.Accounts.find(element => element.Name === accountName)
    }

    checkAll(){
        this.Accounts.forEach((account) =>{
            account.getBalance();
        });
    }
}