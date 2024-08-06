import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { CiPizza, CiRollingSuitcase } from "react-icons/ci";
import { MdMovieCreation } from "react-icons/md";
import './TransactionTable.css';

function TransactionTable({ transactions = [], setTransactions }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    category: '',
    date: '',
  });

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleEditClick = (transaction) => {
    setFormData({
      id: transaction.id,
      title: transaction.title,
      price: transaction.amount.toString(),
      category: transaction.icon, 
      date: transaction.date,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: '',
      title: '',
      price: '',
      category: '',
      date: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveExpense = () => {
    const updatedTransactions = transactions.map((t) =>
      t.id === formData.id ? {
        ...t,
        title: formData.title,
        amount: parseFloat(formData.price), 
        date: formData.date,
        icon: formData.category, // Correct icon reference
      } : t
    );
    setTransactions(updatedTransactions);
    handleCloseModal();
  };

  const displayedTransactions = transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="transaction-table-container">
      <table className="transaction-table">
        <tbody>
          {displayedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="icon-cell">
                {transaction.icon === "CiPizza" && <CiPizza style={{ fontSize: 30, color: "#4CAF50" }} />}
                {transaction.icon === "MdMovieCreation" && <MdMovieCreation style={{ fontSize: 30, color: "#FF5722" }} />}
                {transaction.icon === "CiRollingSuitcase" && <CiRollingSuitcase style={{ fontSize: 30, color: "#FFC107" }} />}
                {typeof transaction.icon === 'object' && transaction.icon}
              </td>
              <td className="details-cell">
                <div className="title">{transaction.title}</div>
                <div className="date">{transaction.date}</div>
              </td>
              <td className="amount-cell">{transaction.amount}</td>
              <td className="actions-cell">
                <button className="action-button delete-button" onClick={() => handleDeleteClick(transaction.id)}>
                  <FaTrashAlt />
                </button>
                <button className="action-button edit-button" onClick={() => handleEditClick(transaction)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
          className="pagination-button"
        >
          &lt;
        </button>
        <span className="pagination-info"> {page + 1}</span>
        <button
          onClick={() => handleChangePage(page + 1)}
          disabled={page >= Math.ceil(transactions.length / rowsPerPage) - 1}
          className="pagination-button"
        >
          &gt;
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card expense-modal">
            <h2>Edit Expense</h2>
            <div className="expense-content">
              <div className="modal-row">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-row">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-buttons">
                <button className="modal-button add" onClick={handleSaveExpense}>Save Expense</button>
                <button className="modal-button cancel" onClick={handleCloseModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
