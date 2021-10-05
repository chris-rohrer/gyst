import React from 'react';
import { Text } from 'react-native';

import DatabaseContext from '../database/context';

function DataImport() {

    const database = React.useContext(DatabaseContext);
    const Papa = require('papaparse')
    // require the module
    var RNFS = require('react-native-fs');
    readFile()


    function readFile (){
        // get a list of files and directories in the document directory inbox
        RNFS.readDir(RNFS.DocumentDirectoryPath + "/Inbox") // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
          .then((result) => {
            console.log('GOT RESULT', result);
      
            // stat the first file
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
          })
          .then((statResult) => {
            if (statResult[0].isFile()) {
              // if we have a file, read it
              return RNFS.readFile(statResult[1], 'utf8');
            }
      
            return 'no file';
          })
          .then((contents) => {
            // log the file contents
            importTransactions(Papa.parse(contents, {header: true}))
            })
          .catch((err) => {
            console.log(err.message, err.code);
          });
      }

    const createTransaction = async (title, amount, currency, date) => {
    try {
        // Make new Transaction
        await database.write(async () => {
        const transactionsCollection = database.get('transactions')
        await transactionsCollection.create(transaction => {
            transaction.title = title;
            transaction.amount = Number(amount)
            transaction.currency = currency;
            let dateArray = date.split(".");
            transaction.date = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0]);
        })
        })
    } catch (e) {
        alert(e)
    }
    }

    function importTransactions (transactions) {
        transactions.data.forEach((transaction) => {
            // loop through each row here
            console.log(transaction.Name)
            createTransaction(transaction.Name, transaction.Amount, transaction.Currency, transaction.Date)
        })
        deleteFile(RNFS.DocumentDirectoryPath + "/Inbox")

    }

      function deleteFile(path){

        return RNFS.unlink(path)
        .then(() => {
          console.log('FILE DELETED at ' + path);
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch((err) => {
          console.log(err.message);
        });
      }

    return (
        null
    );
}

export default DataImport;