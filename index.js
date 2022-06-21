import { parse } from 'csv-parse';
import * as fs from 'fs';
import moment from 'moment';

//var parser = parse({columns: true}, function(err, records){
    //console.log(records)
//});
//fs.createReadStream('./Transactions2014.csv').pipe(parser);
//let fileContents = fs.readFile('./Transactions2014.csv', 'utf8', (err, data)=>{
    //console.log(data);
//});

class Transaction {
    constructor(ID, transDetails) {
        this.ID = ID;
        let details = transDetails.split(',')
        this.Date = moment(details[0]).format("DD/MM/YYYY");
        this.From = details[1];
        this.To = details[2];
        this.Narrative = details[3];
        this.Amount = parseFloat(details[4]);
    }
}

class BankAccount {
    constructor(Name, Balance){
        this.Name = Name;
        this.Balance = Balance;
    }
}

const data = fs.readFileSync('./Transactions2014.csv', 'UTF-8');
const lines = data.split(/\r?\n/);

let transactions = []
let people = []
let transactionID = 0
let firstLine = true
lines.forEach((line) => {
    if (firstLine){
        firstLine = false
    } else {
        let newTransaction = new Transaction(transactionID, line);
        transactions.push(newTransaction)
        transactionID += 1;
        if (!people.includes(newTransaction.To)) {
            people.push(newTransaction.To)
        }
        if (!people.includes(newTransaction.From)) {
            people.push(newTransaction.From)
        }
    }
});

let accounts = []
people.forEach((person)=>{
    let newAccount = new BankAccount(person, 0.00)
    accounts.push(newAccount)
})

