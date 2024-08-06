import React from 'react';
import Wallet from "../Wallet/Wallet";
// import TransactionTable from "../TransactionTable/TransactionTable";
// import ExpenseBarChart from "../ExpenseBarChart/ExpenseBarChart";
import './Expensetracker.css';

function Expensetracker() {
  return (
    <div className="container">
      <h1 className="expense-tracker-title">
        Expense Tracker
      </h1>
      
       <div className="wallet-section">
        <Wallet />
      </div>
      
      {/* <div className="content-section">
        <div className="transaction-table-section">
          <TransactionTable />
        </div>
        <div className="expense-bar-chart-section">
          <ExpenseBarChart />
        </div>
      </div> */}
    </div>
  );
}

export default Expensetracker;
