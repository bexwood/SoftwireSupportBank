import { parse } from 'csv-parse';
import * as fs from 'fs';

//var parser = parse({columns: true}, function(err, records){
    //console.log(records)
//});
//fs.createReadStream('./Transactions2014.csv').pipe(parser);
//let fileContents = fs.readFile('./Transactions2014.csv', 'utf8', (err, data)=>{
    //console.log(data);
//});

const data = fs.readFileSync('./Transactions2014.csv', 'UTF-8');
const lines = data.split(/\r?\n/);

lines.forEach((line) => {
    console.log(line)
});