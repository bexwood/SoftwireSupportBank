export default class Transaction {
    constructor(ID, Date, From, To, Narrative, Amount) {
        this.ID = ID;
        this.Date = Date;
        this.From = From;
        this.To = To;
        this.Narrative = Narrative;
        this.Amount = Amount;
    }

    updateAccountBalance(accounts){
        let sender = accounts.find(element => element.Name === this.From);
        let receiver = accounts.find(element => element.Name === this.To);
        sender.addTransaction(this);
        receiver.addTransaction(this);
    }
}