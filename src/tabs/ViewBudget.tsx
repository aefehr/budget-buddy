import React, { useState } from 'react';

type Budget = {
  [category: string]: {
    spent: number;
    total: number;
  };
};

const ViewBudget = ({ budget }: { budget: Budget }) => {
  const [newCategory, setNewCategory] = useState({ name: '', total: 0 });

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.total > 0) {
      const updatedBudget = {
        ...budget,
        [newCategory.name]: {
          spent: 0,
          total: newCategory.total,
        },
      };

      chrome.storage.local.set({ budget: updatedBudget }, () => {
        setNewCategory({ name: '', total: 0 });
      });
    }
  };

  // Calculate total budget and total spent
  const totalBudget = Object.values(budget).reduce((sum, { total }) => sum + total, 0);
  const totalSpent = Object.values(budget).reduce((sum, { spent }) => sum + spent, 0);
  const totalLeft = totalBudget - totalSpent;

  // Get the current month and year
  const currentMonthYear = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="view-budget">
      <h1 className='header'>Your Budget</h1>

      {/* Overlay Container */}
      <div className="overlay-container">
        {/* Background Overlay */}
        <div className="background-overlay"></div>

        {/* Total Budget Preview */}
        <div className="total-budget-container">
          <p className="total-budget-date">{currentMonthYear}</p>
          <h3 className="total-left">
            ${totalLeft.toFixed(2)} <span className="left-text">left</span>
          </h3>
          <p className="total-budget-text">out of ${totalBudget.toFixed(2)} budgeted</p>
        </div>
      </div>

      <h2 className='subheader'>Categories</h2>
      {Object.entries(budget).map(([category, details], index) => {
        const isOverBudget = details.spent > details.total;
        return (
          <div
            key={index}
            className="budget-item"
          >
            <h3 className="category-name" style={{ margin: 0 }}>{category}</h3>
            <div className="budget-details">
              <div className="spent-info">
                <p>Spent</p>
                <p className={isOverBudget ? "over-budget" : "within-budget"}>
                  ${details.spent}
                </p>
              </div>
              <div className="total-info">
                <p>Budget</p>
                <p>
                  ${details.total}
                </p>
              </div>
            </div>
            <div className="budget-progress-bar">
              <div
                className={`budget-progress ${isOverBudget ? 'over-budget' : 'within-budget'}`}
                style={{ width: `${(details.spent / details.total) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewBudget;





