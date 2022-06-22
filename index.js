import * as fs from 'fs';
import moment from 'moment';
import * as readlineSync from 'readline-sync';
import Transaction from './transaction.js';
import BankAccount from './bankAccount.js';
import log4js from 'log4js';

const logger = log4js.getLogger('index.js');

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});

logger.debug("Launched.");

const data2014 = fs.readFileSync('./Transactions2014.csv', 'UTF-8');
const data2015 = fs.readFileSync('./DodgyTransactions2015.csv','UTF-8');
const data1415 = data2014 + '\n' + data2015
const records1415 = data1415.split(/\r?\n/);

let transactions = [];
let accounts = [];
let transactionID = 0;

records1415.forEach((record) => {
    if (record.substring(0,4)==='Date'){
        return;
    } else {
        let details = record.split(',');
        if (! moment(details[0], 'DD/MM/YYYY', true).isValid()) {
            logger.debug('Incorrect date format found- transaction skipped:', record);
            console.log('Please note: transaction skipped due to error');
        } else if (isNaN(parseFloat(details[4]))){
            logger.debug('Incorrect price format found- transaction skipped:', record);
            console.log('Please note: transaction skipped due to error');
        } else {
            let transDate = moment(details[0], 'DD/MM/YYYY')
            let transAmount = parseFloat(details[4])
            let newTransaction = new Transaction(transactionID, transDate, details[1], details[2], details[3], transAmount);
            transactions.push(newTransaction);
            if (typeof accounts.find(element => element.Name === newTransaction.To) === "undefined"){
                let newAccount = new BankAccount(newTransaction.To, 0.00);
                accounts.push(newAccount);
            }
            if (typeof accounts.find(element => element.Name === newTransaction.From) === "undefined"){
                let newAccount = new BankAccount(newTransaction.From, 0.00);
                accounts.push(newAccount);
            }
            newTransaction.updateAccountBalance(accounts);
            transactionID += 1;
        }
    }
});

let request = readlineSync.question('Please enter a name or \'All\' ');
if (request === 'All'){
    logger.info('All user data was requested');
    accounts.forEach((account) =>{
        account.getBalance();
    });
} else if (typeof accounts.find(element => element.Name === request) !== "undefined") {
    logger.info('Known user was entered:',request);
    transactions.forEach((transaction) =>{
        if (transaction.To === request || transaction.From === request) {
            console.log(transaction);
        }
    })
} else {
    console.log('User not found!');
    logger.info('Unknown User was entered');
}

logger.debug("Terminated.");