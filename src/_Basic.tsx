import 'react-data-grid/lib/styles.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import { giga } from 'gigachat';

type Transaction = {
    Description: string;
    Amount: number;
    TransactionBaseType: string;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
      </div>
  );
}

export default App;
