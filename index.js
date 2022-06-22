import * as fs from 'fs';
import * as readlineSync from 'readline-sync';
import Transaction from './transaction.js';
import BankAccount from './bankAccount.js';
import moment from 'moment';
import log4js from 'log4js';
import XML from 'xml';
import accountManager from "./accountManager.js";

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

//let accounts = [];
const accounts = new accountManager()
let transactionID = 0;

let file = readlineSync.question('Please enter the file name which you would like to use (with the extension) ');
let pathToFile = './'+file;
let splitFile = file.split('.')
let extension = splitFile.pop()

try {
    const data = fs.readFileSync(pathToFile,'UTF-8');
    if (extension === 'json') {
        let records = JSON.parse(data);
        records.forEach((record)=>{
            let transDate = moment(record['Date']).format('DD/MM/YYYY')
            let transAmount = parseFloat(record['Amount'])
            let newTransaction = new Transaction(transactionID, transDate, record['FromAccount'], record['ToAccount'], record['Narrative'], transAmount);
            accounts.executeTransaction(newTransaction)
            transactionID += 1;
        })
    } else if (extension === 'csv') {
        const records = data.split(/\r?\n/);
        records.forEach((record) => {
            if (record.substring(0, 4) === 'Date') {
                return;
            } else {
                let details = record.split(',');
                if (!moment(details[0], 'DD/MM/YYYY', true).isValid()) {
                    logger.debug('Incorrect date format found- transaction skipped:', record);
                    console.log('Please note: transaction skipped due to error');
                } else if (isNaN(parseFloat(details[4]))) {
                    logger.debug('Incorrect price format found- transaction skipped:', record);
                    console.log('Please note: transaction skipped due to error');
                } else {
                    let transDate = moment(details[0], 'DD/MM/YYYY').format('DD/MM/YYYY')
                    let transAmount = parseFloat(details[4])
                    let newTransaction = new Transaction(transactionID, transDate, details[1], details[2], details[3], transAmount);
                    accounts.executeTransaction(newTransaction)
                    transactionID += 1;
                }
            }
        });
    } else if (extension === 'xml'){
        console.log(data);
    } else {
        console.log('Cannot find the file which you provided.')
    }

    let request = readlineSync.question('Please enter a name or \'All\' ');
    if (request === 'All'){
        logger.info('All user data was requested');
        accounts.checkAll()
    } else if (accounts.checkForAccount(request)) {
        logger.info('Known user was entered:',request);
        let account = accounts.findAccount(request)
        console.log(account.Transactions)
    } else {
        console.log('User not found!');
        logger.info('Unknown User was entered');
    }
} catch {
    console.log('Cannot find the file which you provided.');
    logger.debug('Unknown file was entered');
    process.exit();
}


logger.debug("Terminated.");