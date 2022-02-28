import React, { useEffect } from 'react';
import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from '../../rnaudition-340112-08a3c55075b3.json'

function App() {
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;

    useEffect(() => {
        async function getData(docID, sheetID) {
            const result = [];
            const doc = new GoogleSpreadsheet(docID);
            await doc.useServiceAccountAuth(creds);
            await doc.loadInfo();
            const sheet = doc.sheetsById[sheetID];
            const rows = await sheet.getRows();
            for (let row of rows) {
                result.push(row._rawData);
            }
            return result;
        }
        const res = await getData(SPREADSHEET_ID, 0);
        console.log(res)
    },[])

    return (
        <>
            <div className="App">
                <h1>hello</h1>
                <button onClick={send} type='button'>submit</button>
            </div>
        </>
    );
}

export default App;
