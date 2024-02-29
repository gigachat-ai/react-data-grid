import 'react-data-grid/lib/styles.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import { giga } from 'gigachat';
import DataGrid from 'react-data-grid';
import {GithubButton} from "./GithubButton";

// Define the columns for the data grid
const columns = [
  {
    key: 'Description',
    name: 'Description',
    sortable: true,
  },
  {
    key: 'Amount',
    name: 'Amount',
    sortable: true,
  },
  {
    key: 'TransactionBaseType',
    name: 'Type',
    sortable: true,
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
        <div className="flex items-center justify-between space-x-2 m-2">
          <h1 className="text-2xl font-bold">React Data Grid</h1>
          <GithubButton />
        </div>
        <div>
          {transactions && transactions.length > 0 ? (
                  <DataGrid columns={columns} rows={transactions} className="h-full" />
              ) : (
                    <p>Loading...</p>
                )}
        </div>
      </div>
  );
}

export default App;
