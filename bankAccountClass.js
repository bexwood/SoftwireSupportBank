export default class BankAccount {
    constructor(Name, Balance){
        this.Name = Name;
        this.Balance = parseFloat(Balance);
    }

    //methods
    addToBalance(amount) {
        this.Balance += amount
    }

    takeFromBalance(amount) {
        this.Balance -= amount
    }
}