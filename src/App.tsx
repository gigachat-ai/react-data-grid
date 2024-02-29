import 'react-data-grid/lib/styles.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import { giga } from 'gigachat';
import DataGrid from 'react-data-grid';
import {GithubButton} from "./components/GithubButton";

// Define the columns for the data grid
const columns = [
  {
    key: 'Description',
    name: 'Description',
  },
  {
    key: 'Amount',
    name: 'Amount',
  },
  {
    key: 'TransactionBaseType',
    name: 'Type',
  }
];

function App() {
  const [transactions, setTransactions] = useState([]);

  giga.platform.init();

  useEffect(() => {
    async function getTransactions() {
      const accounts = await giga.api.privateClient.pbsa.accounts.list();
      const transactionsResponse = await giga.api.privateClient.pbsa.transactions.get({
        accountId: accounts.result.PrivateBankAccounts[0].AccountNumberForRequests,
        dateFrom: '09/10/2022',
        dateTo: '08/11/2022',
      });
      console.log(transactionsResponse);
      setTransactions(transactionsResponse.result);
    }
    getTransactions();
  }, []);

  return (
      <div className="App">
        <div style={{
          display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.2rem',
        }}>
          <h2>React Data Grid</h2>
          <GithubButton />
        </div>
        <div>
          {transactions && transactions.length > 0 ? (
                  <DataGrid columns={columns} rows={transactions} style={{
                    height: '100%'
                  }} />
              ) : (
                    <p>Loading...</p>
                )}
        </div>
      </div>
  );
}

export default App;
