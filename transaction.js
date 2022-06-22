import moment from 'moment';
export default class Transaction {
    constructor(ID, Date, From, To, Narrative, Amount) {
        this.ID = ID;
        this.Date = Date;
        this.From = From;
        this.To = To;
        this.Narrative = Narrative;
        this.Amount = Amount;
    }
}