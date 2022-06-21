import moment from 'moment';
export default class Transaction {
    constructor(ID, transDetails) {
        this.ID = ID;
        let details = transDetails.split(',')
        this.Date = moment(details[0], 'DD/MM/YYYY').format('DD/MM/YYYY');
        this.From = details[1];
        this.To = details[2];
        this.Narrative = details[3];
        this.Amount = parseFloat(details[4]);
    }
}