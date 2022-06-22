import Transaction from "./transaction.js";

export default class BankAccount {
    constructor(Name, Balance){
        this.Name = Name;
        this.Balance = parseFloat(Balance);
        this.Transactions = []
    }

    performTransaction(transaction){
        this.Transactions.push(transaction)
        if (transaction.To === this.Name){
            this.addToBalance(transaction.Amount)
        } else if (transaction.From === this.Name){
            this.takeFromBalance(transaction.Amount)
        }
    }

    addToBalance(amount) {
        this.Balance += amount
    }

    takeFromBalance(amount) {
        this.Balance -= amount
    }

    getBalance(){
        if (this.Balance <=0){
            console.log(this.Name, 'is owed', Math.abs(this.Balance.toFixed(2)));
        } else {
            console.log(this.Name, 'owes', Math.abs(this.Balance.toFixed(2)));
        }
    }
}