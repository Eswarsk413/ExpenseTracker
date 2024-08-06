import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './ExpenseBarChart.css'; // Import the CSS file for styling

const data = [
  { name: 'Entertainment', value: 400 },
  { name: 'Food', value: 300 },
  { name: 'Travel', value: 200 }
];

function ExpenseBarChart() {
  return (
    <div className="expense-bar-chart-container">
      <h3 className="chart-title">Top Expenses</h3>
      <BarChart
        width={250}
        height={250}
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 10, bottom: 20, left: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default ExpenseBarChart;
