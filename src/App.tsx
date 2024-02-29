import 'react-data-grid/lib/styles.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import { giga } from 'gigachat';
import DataGrid from 'react-data-grid';
import dayjs from 'dayjs'; // You'll need to install dayjs or a similar library

// Define columns for the data grid
const columns = [
  { key: 'Description', name: 'Description', sortable: true },
  { key: 'Amount', name: 'Amount', sortable: true },
  { key: 'TransactionBaseType', name: 'Type', sortable: true },
  { key: 'Date', name: 'Date', sortable: true }, // Add a new column for the date
];

function App() {
  const [transactions, setTransactions] = useState([]);

  giga.platform.init();

  useEffect(() => {
    async function getTransactions() {
      const accounts = await giga.api.privateClient.pbsa.accounts.list();

      // Calculate the date range for the query
      const today = dayjs();
      const oneWeekAgo = today.subtract(1, 'week').format('DD/MM/YYYY');
      const formattedToday = today.format('DD/MM/YYYY');

      // Query the transactions
      const transactionsResponse = await giga.api.privateClient.pbsa.transactions.get({
        accountId: accounts.result.PrivateBankAccounts[0].AccountNumberForRequests,
        dateFrom: oneWeekAgo,
        dateTo: formattedToday,
      });
      console.log(transactionsResponse);

      // Process the transactions to include a formatted date field
      const processedTransactions = transactionsResponse.result.map(transaction => ({
        ...transaction,
        Date: dayjs(transaction.TransactionDate).format('DD/MM/YYYY'), // Format the transaction date
      }));

      setTransactions(processedTransactions);
    }

    getTransactions();
  }, []);

  return (
      <div className="App">
        <div>
          {transactions && transactions.length > 0 ? (
              <DataGrid columns={columns} rows={transactions} />
          ) : (
              <p>Loading...</p>
          )}
        </div>
      </div>
  );
}

export default App;
