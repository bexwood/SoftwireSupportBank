export default class BankAccount {
    constructor(Name, Balance){
        this.Name = Name;
        this.Balance = parseFloat(Balance);
        this.Transactions = [];
    }

    addTransaction(transaction){
        this.updateBalance(transaction);
        this.Transactions.push(transaction);
    }

    updateBalance(transaction){
        if (transaction.From === this.Name){
            this.Balance -= transaction.Amount;
        } else if (transaction.To === this.Name) {
            this.Balance += transaction.Amount;
        }
    }

    getBalance(){
        if (this.Balance <=0){
            console.log(this.Name, 'is owed', Math.abs(this.Balance.toFixed(2)));
        } else {
            console.log(this.Name, 'owes', Math.abs(this.Balance.toFixed(2)));
        }
    }

    getTransactions(){
        return this.Transactions;
    }
}