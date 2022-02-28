import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from './rnaudition-340112-08a3c55075b3.json'
// console.log(creds)


async function sendData(docID, sheetID, row) {
    const doc = new GoogleSpreadsheet(docID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetID];
    const res = await sheet.addRow(row);
    return res;
}

async function getData(docID, sheetID) {
    const doc = new GoogleSpreadsheet(docID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetID];
    const res = await sheet.getRows();
    return res;
}

export { sendData,  getData };