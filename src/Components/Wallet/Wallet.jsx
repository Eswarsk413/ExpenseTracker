import React, { useState } from "react";
import "./Wallet.css";
import { PieChart, Pie, Cell, Legend, LabelList } from "recharts";
import TransactionTable from "../TransactionTable/TransactionTable";
import ExpenseBarChart from "../ExpenseBarChart/ExpenseBarChart";

const COLORS = ["#A000FF", "#FF9304", "#FDE006"];

function Wallet() {
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [income, setIncome] = useState("");
  const [walletBalance, setWalletBalance] = useState(4500);
  const [transactions, setTransactions] = useState([
    { id: 1, icon: "CiPizza", title: "Samosa", date: "2024-08-01", amount: 150 },
    { id: 2, icon: "MdMovieCreation", title: "Movie", date: "2024-08-02", amount: 300 },
    { id: 3, icon: "CiRollingSuitcase", title: "Auto", date: "2024-08-03", amount: 50 },
  ]);

  const [expenseTitle, setExpenseTitle] = useState("");
  const [expensePrice, setExpensePrice] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const handleAddIncomeClick = () => setIsIncomeModalOpen(true);
  const handleCloseIncomeModal = () => setIsIncomeModalOpen(false);
  const handleAddBalance = () => {
    setWalletBalance(walletBalance + parseFloat(income));
    setIncome("");
    handleCloseIncomeModal();
  };

  const handleAddExpenseClick = () => setIsExpenseModalOpen(true);
  const handleCloseExpenseModal = () => setIsExpenseModalOpen(false);

  const handleAddExpense = () => {
    const expenseAmount = parseFloat(expensePrice);

    if (expenseAmount > walletBalance) {
      alert("You cannot spend more than your available wallet balance.");
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      icon: expenseCategory,
      title: expenseTitle,
      date: expenseDate,
      amount: expenseAmount,
    };

    setWalletBalance(walletBalance - expenseAmount);
    setTransactions([...transactions, newTransaction]);

    setExpenseTitle("");
    setExpensePrice("");
    setExpenseCategory("");
    setExpenseDate("");
    handleCloseExpenseModal();
  };

  const expenseCategories = [
    { name: "Food", value: transactions.filter(t => t.icon === "CiPizza").reduce((sum, t) => sum + t.amount, 0) },
    { name: "Entertainment", value: transactions.filter(t => t.icon === "MdMovieCreation").reduce((sum, t) => sum + t.amount, 0) },
    { name: "Travel", value: transactions.filter(t => t.icon === "CiRollingSuitcase").reduce((sum, t) => sum + t.amount, 0) },
  ];

  return (
    <div>
    <div className="wallet-container">
      <div className="card">
        <div className="card-content">
          <div>Wallet Balance: {walletBalance}</div>
          <button className="button" onClick={handleAddIncomeClick}>
            + Add Income
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div>Expenses: {transactions.reduce((sum, t) => sum + t.amount, 0)}</div>
          <button className="button" onClick={handleAddExpenseClick}>
            + Add Expense
          </button>
        </div>
      </div>
      <div className="chart-container">
  <PieChart width={300} height={300}>
    <Pie
      data={expenseCategories}  // Using expenseCategories from Code 1
      cx="50%"
      cy="50%"
      outerRadius={100}
      fill="#8884d8"
      dataKey="value"
      stroke="none"
      labelLine={false}  // Preserved from Code 1
    >
      {expenseCategories.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={COLORS[index % COLORS.length]}
        />
      ))}
      <LabelList
        dataKey="value"
        formatter={(value, entry, index) => {
          const total = expenseCategories.reduce((sum, entry) => sum + entry.value, 0);  // Using expenseCategories
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        }}
        position="inside"
        fill="#fff" // Ensures the text is visible inside the pie slices
        fontSize={10} // Adjust font size as needed
      />
    </Pie>
    <Legend
      verticalAlign="bottom"
      align="center"
      layout="horizontal"
      wrapperStyle={{ paddingTop: "10px" }}
    />
  </PieChart>
</div>
 

      {/* Income Modal */}
      {isIncomeModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card income-modal">
            <h2>Add Balance</h2>
            <div className="modal-content income-content">
              <input
                type="text"
                placeholder="Add Income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
              <button className="modal-button add" onClick={handleAddBalance}>
                Add Balance
              </button>
              <button
                className="modal-button cancel"
                onClick={handleCloseIncomeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {isExpenseModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card expense-modal">
            <h2>Add Expense</h2>
            <div className="modal-content expense-content">
              <div className="modal-row">
                <input
                  type="text"
                  placeholder="Title"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={expensePrice}
                  onChange={(e) => setExpensePrice(e.target.value)}
                />
              </div>
              <div className="modal-row">
                <input
                  type="text"
                  placeholder="Category"
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                />
                <input
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                />
              </div>
              <div className="modal-buttons">
                <button className="modal-button add" onClick={handleAddExpense}>
                  Add Expense
                </button>
                <button
                  className="modal-button cancel"
                  onClick={handleCloseExpenseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="content-section">
        <div className="transaction-table-section">
          <TransactionTable transactions={transactions} setTransactions={setTransactions} />
        </div>
        <div className="expense-bar-chart-section">
          <ExpenseBarChart />
        </div>
      </div>
    
    </div>
  );
}

export default Wallet;
