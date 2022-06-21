import { parse } from 'csv-parse';
import * as fs from 'fs';


var parser = parse({columns: true}, function(err, records){
    console.log(records);
});

fs.createReadStream('./Transactions2014.csv').pipe(parser);